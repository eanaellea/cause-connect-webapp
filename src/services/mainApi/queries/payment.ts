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

export interface CreateAccountWithPlanBody {
  email: string
}

export interface CreateAccountWithPlanResponse {
  account: Stripe.Account
  plan: Stripe.Plan
}

export const createAccountWithPlanQuery = async (
  createAccountWithPlanBody: CreateAccountWithPlanBody
): Promise<CreateAccountWithPlanResponse | null> => {
  try {
    const result = await query.post('payment/account', {
      json: createAccountWithPlanBody
    })
    const json = await result.json<CreateAccountWithPlanResponse>()
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
