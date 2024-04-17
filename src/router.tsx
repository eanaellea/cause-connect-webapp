import { createBrowserRouter, redirect } from 'react-router-dom'

import { GlobalLayout } from '@/pages/layouts/globalLayout/GlobalLayout'
import { Home } from './pages/home/Home'
import { Register } from './pages/register/Register'
import { LogIn } from './pages/logIn/LogIn'
import { useGlobalStore } from './store/store'
import { Dashboard } from './pages/dashboard/Dashboard'
import { ResetPassword } from './pages/resetPassword/ResetPassword'
import { PublicLayout } from './pages/layouts/publicLayout/PublicLayout'
import { AppLayout } from './pages/layouts/appLayout/AppLayout'
import { Welcome } from './pages/welcome/Welcome'
import { Documents } from './pages/documents/Documents'
import { useShareCodeAction } from './store/documentsSlice/actions'
import { Votes } from './pages/votes/Votes'
import { AssociationPage } from './pages/association/AssociationPage'
import { Surveys } from './pages/surveys/Surveys'
import { Chatbot } from './pages/chatbot/Chatbot'
import { Settings } from './pages/settings/Settings'
import { Calendar } from './pages/calendar/Calendar'
import { EventPage } from './pages/eventPage/EventPage'
import { Payments } from './pages/payments/Payments'
import { getPaymentDataAction, getThemeAction } from './store/settingsSlice/actions'
import { isAccountReadyAction, isCustomerReadyAction } from './store/paymentSlice/actions'
import { Subscribe } from './designSystem/stripe/Subscribe'
import { UserRole } from './services/mainApi/queries/auth'
import { PaymentsSetup } from './pages/associationPaymentSetup/associationPaymentSetup'
import { PrivateDonation } from './designSystem/stripe/PrivateDonation'
import { DonationReturn } from './pages/donationReturn/DonationReturn'
import { ContributionReturn } from './pages/contributionReturn/ContributionReturn'
import { PublicDonation } from './pages/donation/PublicDonation'
import { JavaApp } from './pages/javaApp/JavaApp'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <GlobalLayout />,
      children: [
        {
          path: '',
          element: <PublicLayout />,
          children: [
            {
              path: '',
              element: <Home />
            },
            {
              path: 'login',
              element: <LogIn />
            },
            {
              path: 'first-login',
              element: <ResetPassword title='Première connexion' buttonContent='Connexion' />
            },
            {
              path: 'welcome',
              element: <Welcome />
            },
            {
              path: 'register',
              element: <Register />
            },
            {
              path: 'reset-password',
              element: <ResetPassword title='Réinitialiser le mot de passe' buttonContent='Réinitialiser le mot de passe' />
            },
            {
              path: 'association-setup',
              element: <PaymentsSetup />
            },
            {
              path: 'user-setup',
              element: <Subscribe />
            },
            {
              path: 'checkout/donation/return',
              element: <DonationReturn />
            },
            {
              path: 'donate',
              element: <PublicDonation />
            },
            {
              path: 'cause-connector',
              element: <JavaApp />
            }
          ]
        },
        {
          path: '/app',
          loader: async () => {
            if (useGlobalStore.getState().token === null) {
              return redirect('/login')
            }
            await getPaymentDataAction()
            if (await isAccountReadyAction() !== true && useGlobalStore.getState().user?.role === UserRole.ADMIN) {
              return redirect('/association-setup')
            }
            if (await isCustomerReadyAction() !== true) {
              return redirect('/user-setup')
            }
            return null
          },
          element: <AppLayout />,
          children: [
            {
              path: '',
              element: <Dashboard />
            },
            {
              path: 'documents',
              element: <Documents />,
              children: [
                {
                  path: 'use-share-code/:shareCode',
                  loader: async ({ params }) => {
                    if (params.shareCode === undefined) {
                      return redirect('/app/documents')
                    }
                    await useShareCodeAction(params.shareCode)
                    return redirect('/app/documents')
                  }
                }
              ]
            },
            {
              path: 'votes',
              element: <Votes />,
              children: [
                {
                  path: ':voteId',
                  element: <Votes />
                }
              ]
            },
            {
              path: 'surveys',
              element: <Surveys />,
              children: [
                {
                  path: ':surveyId',
                  element: <Surveys />
                }
              ]
            },
            {
              path: 'association',
              element: <AssociationPage />
            },
            {
              path: 'chatbot',
              element: <Chatbot />
            },
            {
              path: 'settings',
              element: <Settings />,
              loader: async () => {
                await getThemeAction()
                return null
              }
            },
            {
              path: 'calendar',
              element: <Calendar />
            },
            {
              path: 'events',
              children: [
                {
                  path: ':eventId',
                  element: <EventPage />
                }
              ]
            },
            {
              path: 'payments',
              element: <Payments />,
              loader: async () => {
                await getPaymentDataAction()
                return null
              }
            },
            {
              path: 'donate',
              element: <PrivateDonation />
            },
            {
              path: 'checkout/donation/return',
              element: <DonationReturn />
            },
            {
              path: 'checkout/contribution/return',
              element: <ContributionReturn />
            }
          ]
        }
      ]
    }
  ]
)
