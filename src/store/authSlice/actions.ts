import { loginQuery, registerQuery, ResetPasswordBody, resetPasswordQuery } from '@/services/mainApi/queries/auth'
import { useGlobalStore } from '../store'
import { GlobalStore } from '../types'
import { router } from '@/router'

export const loginAction = async (body: any): Promise<void> => {
  const setState = useGlobalStore.setState
  const response = await loginQuery(body)

  if (response === null) {
    return
  }

  setState({ token: response.token })
  await router.navigate('/app')
}

export const logoutAction = async (): Promise<void> => {
  useGlobalStore.setState({ token: null, email: null, id: null })
  await router.navigate('/login')
}

export const registerAction = async (signUpBody: any, associationLogo: File | null): Promise<void> => {
  const response = await registerQuery(signUpBody, associationLogo)

  if (response === null) {
    return
  }

  useGlobalStore.setState(() => ({ id: response.id, email: signUpBody.admin.email }))

  await router.navigate('/welcome')
}

export const resetPasswordAction = async (resetPasswordBody: ResetPasswordBody): Promise<void> => {
  const response = await resetPasswordQuery(resetPasswordBody)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state: GlobalStore) => ({ ...state, token: response.token }))

  await router.navigate('/app')
}
