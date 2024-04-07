import { query } from '../setup'

interface ThemeResponse {
  id: string
  color: string
  font: string
}

interface SettingsResponse {
  id: string
  contributionPrice: number
  contributionInterval: string
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
  contributionPrice?: number
  contributionInterval?: string
  theme?: ThemeResponse
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
