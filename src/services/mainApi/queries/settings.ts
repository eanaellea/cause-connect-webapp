import { query } from '../setup'

interface PaymentDataResponse {
  id: string
  stripeAccountId: string
  stripePlanId: string
  stripeSessionInProgress: boolean
  contributionPrice: number
}

interface ThemeResponse {
  id: string
  color: string
  font: string
}

interface SettingsResponse {
  id: string
  paymentData: PaymentDataResponse
  theme: ThemeResponse
}

export const getSettingsQuery = async (): Promise<SettingsResponse | null> => {
  try {
    const result = await query.get('settings')
    const json = await result.json<SettingsResponse>()
    return json
  } catch (e) {
    return null
  }
}

export interface UpdateSettingsBody {
  paymentData?: UpdatePaymentDataBody
  theme?: UpdateThemeBody
}

export const updateSettingsQuery = async (updateSettingsBody: UpdateSettingsBody): Promise<SettingsResponse | null> => {
  try {
    const result = await query.patch('settings', {
      json: updateSettingsBody
    })
    const json = await result.json<SettingsResponse>()
    return json
  } catch (e) {
    return null
  }
}

export const getThemeQuery = async (): Promise<ThemeResponse | null> => {
  try {
    const result = await query.get('settings/theme')
    const json = await result.json<ThemeResponse>()
    return json
  } catch (e) {
    return null
  }
}

export interface UpdateThemeBody {
  color?: string
  font?: string
}

export const updateThemeQuery = async (updateThemeBody: UpdateThemeBody): Promise<ThemeResponse | null> => {
  try {
    const result = await query.patch('settings/theme', {
      json: updateThemeBody
    })
    const json = await result.json<ThemeResponse>()
    return json
  } catch (e) {
    return null
  }
}

export const getPaymentDataQuery = async (): Promise<PaymentDataResponse | null> => {
  try {
    const result = await query.get('settings/payment')
    const json = await result.json<PaymentDataResponse>()
    return json
  } catch (e) {
    return null
  }
}

export interface UpdatePaymentDataBody {
  stripeAccountId?: string
  stripePlanId?: string
  contributionPrice?: number
}

export const updatePaymentDataQuery = async (updatePaymentDataBody: UpdatePaymentDataBody): Promise<PaymentDataResponse | null> => {
  try {
    const result = await query.patch('settings/payment', {
      json: updatePaymentDataBody
    })
    const json = await result.json<PaymentDataResponse>()
    return json
  } catch (e) {
    return null
  }
}
