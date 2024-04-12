import { query } from '../setup'
import Stripe from 'stripe'

export const getAccountQuery = async (accountId: string): Promise<Stripe.Account | null> => {
  try {
    const result = await query.get('payment/account/' + accountId)
    const json = await result.json<Stripe.Account>()
    return json
  } catch (e) {
    return null
  }
}

export interface CreateAccountWithProductBody {
  email: string
}

export interface CreateAccountWithProductResponse {
  account: Stripe.Account
  product: Stripe.Product
}

export const createAccountWithProductQuery = async (
  createAccountWithProductBody: CreateAccountWithProductBody
): Promise<CreateAccountWithProductResponse | null> => {
  try {
    const result = await query.post('payment/account', {
      json: createAccountWithProductBody
    })
    const json = await result.json<CreateAccountWithProductResponse>()
    return json
  } catch (e) {
    return null
  }
}

export const createAccountSessionQuery = async (accountId: string): Promise<string | null> => {
  try {
    const result = await query.post('payment/account/' + accountId + '/session')
    const clientSecret = await result.text()
    return clientSecret
  } catch (e) {
    console.log('createAccountSessionQuery error', e)
    return null
  }
}

export interface UpdateProductBody {
  contributionPrice: number
}

export const updateProductQuery = async (planId: string, updateProductBody: UpdateProductBody): Promise<Stripe.Product | null> => {
  try {
    const result = await query.patch('payment/plan/' + planId, {
      json: updateProductBody
    })
    const json = await result.json<Stripe.Product>()
    return json
  } catch (e) {
    return null
  }
}
