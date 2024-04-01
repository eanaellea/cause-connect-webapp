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

  setState((state: GlobalStore) => ({ ...state, association: myInfo.association }))
  setState((state: GlobalStore) => ({ ...state, user: {
    id: myInfo.id,
    email: myInfo.email,
    role: myInfo.role,
    fullName: myInfo.fullName
  } }))

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
        id: "",
        email: signUpBody.admin.email,
        role: UserRole.ADMIN,
        fullName: signUpBody.admin.fullName,
      },
      association: {
        id: response.id,
        name: response.name,
        description: response.description,
        logo: response.logo
      }
    }))

  await router.navigate('/welcome')
}

export const resetPasswordAction = async (resetPasswordBody: ResetPasswordBody): Promise<void> => {
  const setState = useGlobalStore.setState
  const response = await resetPasswordQuery(resetPasswordBody)

  if (response === null) {
    return
  }

  setState((state: GlobalStore) => ({ ...state, token: response.token }))

  const myInfo = await fetchMe()

  setState((state: GlobalStore) => ({ ...state, association: myInfo.association }))
  setState((state: GlobalStore) => ({ ...state, user: {
    id: myInfo.id,
    email: myInfo.email,
    role: myInfo.role,
    fullName: myInfo.fullName
  } }))

  await router.navigate('/app')
}
