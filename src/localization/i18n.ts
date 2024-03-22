import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { LANGUAGE_FALLBACK } from '@/constants'

import frLang from './fr.json'
import enLang from './en.json'

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enLang},
      fr: { translation: frLang },
    },
    lng: LANGUAGE_FALLBACK, // set actual language here
    fallbackLng: LANGUAGE_FALLBACK
  })
  .catch(e => { console.error(e) })
