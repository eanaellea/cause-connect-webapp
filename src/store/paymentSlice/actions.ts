import { useGlobalStore } from '../store'
import {
  createAccountWithProductsQuery,
  CreateAccountWithProductsBody,
  CreateAccountWithProductsResponse,
  createAccountSessionQuery,
  getAccountQuery,
  createContributionCheckoutSessionQuery,
  getCustomerSubscriptionQuery,
  createDonationCheckoutSessionQuery
} from '@/services/mainApi/queries/payment'
import { updatePaymentDataQuery } from '@/services/mainApi/queries/settings'

export const createAccountWithProductsAction = async (createAccountWithProductsBody: CreateAccountWithProductsBody): Promise<CreateAccountWithProductsResponse | null> => {
  const response = await createAccountWithProductsQuery(createAccountWithProductsBody)

  if (response === null) {
    return null
  }

  await updatePaymentDataQuery({
    stripeAccountId: response.account.id,
    stripeContributionId: response.contribution.id,
    stripeDonationId: response.donation.id
  })

  useGlobalStore.setState((state) => ({
    ...state,
    payment: {
      ...state.payment,
      stripeAccountId: response.account.id,
      stripeContributionId: response.contribution.id,
      stripeDonationId: response.donation.id
    }
  }))

  return response
}

export const isAccountReadyAction = async (): Promise<boolean | null> => {
  const stripeAccountId = useGlobalStore.getState().payment.stripeAccountId
  if (stripeAccountId === null) {
    return false
  }
  const response = await getAccountQuery(stripeAccountId)

  return response?.payouts_enabled ?? null
}

export const createAccountSessionAction = async (): Promise<string | null> => {
  if (useGlobalStore.getState().payment?.stripeAccountId === undefined) {
    const createAccountResponse = await createAccountWithProductsAction({ email: useGlobalStore.getState().user?.email ?? '' })
    if (createAccountResponse === null) {
      return null
    }
  }

  const stripeAccountId = useGlobalStore.getState().payment.stripeAccountId
  if (stripeAccountId === null) {
    return null
  }

  const response = await createAccountSessionQuery(stripeAccountId)

  if (response === null) {
    return null
  }

  return response
}

export const isCustomerReadyAction = async (): Promise<boolean | null> => {
  const stripeCustomerId = useGlobalStore.getState().user?.stripeCustomerId
  if (stripeCustomerId == null) {
    return null
  }
  const response = await getCustomerSubscriptionQuery(stripeCustomerId)
  const subscriptionsCount = response?.data.reduce((acc, subscription) => {
    if (subscription.status === 'active') {
      return acc + 1
    }
    return acc
  }, 0)
  return subscriptionsCount === 1
}

export const createContributionCheckoutSessionAction = async (): Promise<string | null> => {
  const stripeCustomerId = useGlobalStore.getState().user?.stripeCustomerId
  if (stripeCustomerId == null) {
    return null
  }

  const response = await createContributionCheckoutSessionQuery(stripeCustomerId)

  if (response === null) {
    return null
  }

  return response
}

export const createDonationCheckoutSessionAction = async (): Promise<string | null> => {
  const stripeCustomerId = useGlobalStore.getState().user?.stripeCustomerId
  if (stripeCustomerId == null) {
    return null
  }

  const response = await createDonationCheckoutSessionQuery(stripeCustomerId)

  if (response === null) {
    return null
  }

  return response
}