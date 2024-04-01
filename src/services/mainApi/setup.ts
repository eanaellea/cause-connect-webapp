import { mockBeforeRequestInterceptor } from '@/services/mainApi/setup/mockSetup'
import ky from 'ky'

import { authInterceptor } from './setup/authInterceptor'

export const query = ky.create({
  // prefixUrl: 'https://api.causeconnect.fr',
  prefixUrl: 'http://localhost',
  headers: {},
  hooks: {
    beforeRequest: [authInterceptor, mockBeforeRequestInterceptor]
  }
})
