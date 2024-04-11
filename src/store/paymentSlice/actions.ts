import { useGlobalStore } from '../store'
import { createAccountWithPlanQuery, CreateAccountWithPlanBody, CreateAccountWithPlanResponse, createAccountSessionQuery, getAccountQuery } from '@/services/mainApi/queries/payment'
import { updatePaymentDataQuery } from '@/services/mainApi/queries/settings'

export const createAccountWithPlanAction = async (createAccountWithPlanBody: CreateAccountWithPlanBody): Promise<CreateAccountWithPlanResponse | null> => {
  const response = await createAccountWithPlanQuery(createAccountWithPlanBody)

  if (response === null) {
    return null
  }

  await updatePaymentDataQuery({
    stripeAccountId: response.account.id,
    stripePlanId: response.plan.id
  })

  useGlobalStore.setState((state) => ({
    ...state,
    payment: {
      ...state.payment,
      stripeAccountId: response.account.id,
      stripePlanId: response.plan.id
    }
  }))

  return response
}

export const getAccountAction = async (): Promise<boolean | null> => {
  const stripeAccountId = useGlobalStore.getState().payment.stripeAccountId
  if (stripeAccountId === null) {
    return false
  }
  const response = await getAccountQuery(stripeAccountId)

  return response?.payouts_enabled ?? null
}

export const createAccountSessionAction = async (): Promise<string | null> => {
  if (useGlobalStore.getState().payment?.stripeAccountId === undefined) {
    const createAccountResponse = await createAccountWithPlanAction({ email: useGlobalStore.getState().user?.email ?? '' })
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
