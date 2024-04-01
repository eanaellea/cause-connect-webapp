import { fetchMe, loginQuery, registerQuery, ResetPasswordBody, resetPasswordQuery, UserRole } from '@/services/mainApi/queries/auth'
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

  const myInfo = await fetchMe()

  setState({ user: myInfo })

  await router.navigate('/app')
}

export const logoutAction = async (): Promise<void> => {
  useGlobalStore.setState({ token: null, user: null })
  await router.navigate('/login')
}

export const registerAction = async (signUpBody: any, associationLogo: File | null): Promise<void> => {
  const response = await registerQuery(signUpBody, associationLogo)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => (
    {
      ...state,
      user: {
        id: response.id,
        email: signUpBody.admin.email,
        role: UserRole.ADMIN,
        fullName: signUpBody.admin.fullName
      }
    }))

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
