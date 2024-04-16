import { mockBeforeRequestInterceptor } from '@/services/mainApi/setup/mockSetup'
import ky from 'ky'

import { authInterceptor } from './setup/authInterceptor'
import { errorInterceptor } from './setup/errorInterceptor'

export const query = ky.create({
  // prefixUrl: 'https://api.causeconnect.fr',
  prefixUrl: 'http://localhost:3000',
  headers: {},
  hooks: {
    beforeRequest: [authInterceptor, mockBeforeRequestInterceptor],
    afterResponse: [errorInterceptor]
  }
})
