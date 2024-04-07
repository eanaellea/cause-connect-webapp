import { useGlobalStore } from '../store'
import { getSettingsQuery, updateSettingsQuery, UpdateSettingsBody, getThemeQuery, updateThemeQuery, UpdateThemeBody } from '@/services/mainApi/queries/settings'

export const getSettingsAction = async (): Promise<void> => {
  const response = await getSettingsQuery()

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    settings: {
      contributionPrice: response.contributionPrice,
      contributionInterval: response.contributionInterval
    },
    theme: response.theme
  }))
}

export const updateSettingsAction = async (updateSettingsBody: UpdateSettingsBody): Promise<void> => {
  const response = await updateSettingsQuery(updateSettingsBody)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    settings: {
      contributionPrice: response.contributionPrice,
      contributionInterval: response.contributionInterval
    }
  }))
}

export const getThemeAction = async (): Promise<void> => {
  const response = await getThemeQuery()

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    theme: response
  }))
}

export const updateThemeAction = async (updateThemeBody: UpdateThemeBody): Promise<void> => {
  const response = await updateThemeQuery(updateThemeBody)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    theme: response
  }))
}
