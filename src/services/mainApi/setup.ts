import { mockBeforeRequestInterceptor } from '@/services/mainApi/setup/mockSetup'
import ky from 'ky'

import { authInterceptor } from './setup/authInterceptor'
import { errorInterceptor } from './setup/errorInterceptor'

export const query = ky.create({
  prefixUrl: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {},
  hooks: {
    beforeRequest: [authInterceptor, mockBeforeRequestInterceptor],
    afterResponse: [errorInterceptor]
  }
})
