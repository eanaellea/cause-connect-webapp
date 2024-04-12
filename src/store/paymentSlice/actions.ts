import { useGlobalStore } from '../store'
import {
  createAccountWithProductQuery,
  CreateAccountWithProductBody,
  CreateAccountWithProductResponse,
  createAccountSessionQuery,
  getAccountQuery,
  updateProductQuery,
  UpdateProductBody
} from '@/services/mainApi/queries/payment'
import { updatePaymentDataQuery } from '@/services/mainApi/queries/settings'

export const createAccountWithProductAction = async (createAccountWithProductBody: CreateAccountWithProductBody): Promise<CreateAccountWithProductResponse | null> => {
  const response = await createAccountWithProductQuery(createAccountWithProductBody)

  if (response === null) {
    return null
  }

  await updatePaymentDataQuery({
    stripeAccountId: response.account.id,
    stripeProductId: response.product.id
  })

  useGlobalStore.setState((state) => ({
    ...state,
    payment: {
      ...state.payment,
      stripeAccountId: response.account.id,
      stripeProductId: response.product.id
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
    const createAccountResponse = await createAccountWithProductAction({ email: useGlobalStore.getState().user?.email ?? '' })
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

export const updateProductAction = async (updateProductBody: UpdateProductBody): Promise<boolean> => {
  const stripeProductId = useGlobalStore.getState().payment.stripeProductId
  if (stripeProductId === null) {
    return false
  }

  const response = await updateProductQuery(stripeProductId, updateProductBody)

  if (response === null) {
    return false
  }

  return true
}
