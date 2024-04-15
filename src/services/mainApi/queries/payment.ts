import { query } from '../setup'
import Stripe from 'stripe'
import { UserResponse } from './users'

export const getAccountQuery = async (accountId: string): Promise<Stripe.Account | null> => {
  try {
    const result = await query.get('payment/accounts/' + accountId)
    const json = await result.json<Stripe.Account>()
    return json
  } catch (e) {
    return null
  }
}

export interface CreateAccountWithProductsBody {
  email: string
}

export interface CreateAccountWithProductsResponse {
  account: Stripe.Account
  contribution: Stripe.Product
  donation: Stripe.Product
}

export const createAccountWithProductsQuery = async (
  createAccountWithProductsBody: CreateAccountWithProductsBody
): Promise<CreateAccountWithProductsResponse | null> => {
  try {
    const result = await query.post('payment/accounts', {
      json: createAccountWithProductsBody
    })
    const json = await result.json<CreateAccountWithProductsResponse>()
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

export const createContributionCheckoutSessionQuery = async (customerId: string): Promise<string | null> => {
  try {
    const result = await query.post('payment/customers/' + customerId + '/checkout/contribution')
    const clientSecret = await result.text()
    return clientSecret
  } catch (e) {
    return null
  }
}

export const createDonationCheckoutSessionQuery = async (customerId: string): Promise<string | null> => {
  try {
    const result = await query.post('payment/customers/' + customerId + '/checkout/donation')
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

export const getCheckoutSessionQuery = async (sessionId: string): Promise<Stripe.Checkout.Session | null> => {
  try {
    const result = await query.get('payment/checkout/session/' + sessionId + '/status')
    const json = await result.json<Stripe.Checkout.Session>()
    return json
  } catch (e) {
    return null
  }
}

export const getLateUsersQuery = async (): Promise<UserResponse[] | null> => {
  try {
    const result = await query.get('payment/late-users')
    const json = await result.json<UserResponse[]>()
    return json
  } catch (e) {
    return null
  }
}

export interface SendLateUsersReminderBody {
  emails: string[]
}

export const sendLateUsersReminderQuery = async (sendLateUsersReminderBody: SendLateUsersReminderBody): Promise<boolean> => {
  try {
    const result = await query.post('payment/late-users/send-reminder', {
      json: sendLateUsersReminderBody
    })
    return result.ok
  } catch (e) {
    return false
  }
}
