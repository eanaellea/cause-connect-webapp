import { AfterResponseHook } from 'ky'
import toast from 'react-hot-toast'

export const errorInterceptor: AfterResponseHook = async (_, __, response: Response): Promise<Response> => {
  if (response.status >= 400) {
    const message = (await response.json()).message
    toast.error(message)
  }

  return response
}
