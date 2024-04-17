import { useGlobalStore } from '../store'
import {
  getSettingsQuery,
  updateSettingsQuery,
  UpdateSettingsBody,
  getThemeQuery,
  updateThemeQuery,
  UpdateThemeBody,
  getPaymentDataQuery,
  updatePaymentDataQuery,
  UpdatePaymentDataBody
} from '@/services/mainApi/queries/settings'

export const getSettingsAction = async (): Promise<void> => {
  const response = await getSettingsQuery()

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    payment: response.paymentData,
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
    payment: response.paymentData,
    theme: response.theme
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

export const getPaymentDataAction = async (): Promise<void> => {
  const response = await getPaymentDataQuery()

  if (response === null) {
    throw new Error('Error while fetching payment data')
  }

  useGlobalStore.setState((state) => ({
    ...state,
    payment: response
  }))
}

export const updatePaymentDataAction = async (updatePaymentDataBody: UpdatePaymentDataBody): Promise<void> => {
  const response = await updatePaymentDataQuery(updatePaymentDataBody)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    payment: response
  }))
}
