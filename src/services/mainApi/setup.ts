import { mockBeforeRequestInterceptor } from '@/services/mainApi/setup/mockSetup'
import ky from 'ky'

import { authInterceptor } from './setup/authInterceptor'
import { errorInterceptor } from './setup/errorInterceptor'

export const query = ky.create({
  prefixUrl: 'https://api.causeconnect.fr',
  headers: {},
  hooks: {
    beforeRequest: [authInterceptor, mockBeforeRequestInterceptor],
    afterResponse: [errorInterceptor]
  }
})
