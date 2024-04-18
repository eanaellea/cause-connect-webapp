import { AfterResponseHook } from 'ky'
import toast from 'react-hot-toast'

export const errorInterceptor: AfterResponseHook = async (request: Request, _, response: Response): Promise<Response> => {
  if (request.url.includes('settings/payment')) {
    return response
  }
  if (response.status >= 400) {
    const message = (await response.json()).message
    toast.error(message)
  }

  return response
}
