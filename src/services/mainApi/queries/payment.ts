import { query } from '../setup'
import Stripe from 'stripe'

export const getAccountQuery = async (accountId: string): Promise<Stripe.Account | null> => {
  try {
    const result = await query.get('payment/accounts/' + accountId)
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
    const result = await query.post('payment/accounts', {
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
    const result = await query.post('payment/accounts/' + accountId + '/session')
    const clientSecret = await result.text()
    return clientSecret
  } catch (e) {
    console.log('createAccountSessionQuery error', e)
    return null
  }
}

export const createCheckoutSessionQuery = async (customerId: string): Promise<string | null> => {
  try {
    const result = await query.post('payment/customers/' + customerId + '/checkout-session')
    const clientSecret = await result.text()
    return clientSecret
  } catch (e) {
    return null
  }
}

export const getCustomerSubscriptionQuery = async (customerId: string): Promise<Stripe.ApiList<Stripe.Subscription> | null> => {
  try {
    const result = await query.get('payment/customers/' + customerId + '/subscription')
    const json = await result.json<Stripe.ApiList<Stripe.Subscription>>()
    return json
  } catch (e) {
    return null
  }
}
