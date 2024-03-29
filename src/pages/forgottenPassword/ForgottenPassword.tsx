import { Input, Button } from 'antd'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import styles from './ForgottenPassword.module.scss'
import { FC } from 'react'

const forgottenPasswordSchema = z.object({
  email: z.string().email()
})

export const ForgottenPassword: FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof forgottenPasswordSchema>>({
    resolver: zodResolver(forgottenPasswordSchema)
  })
  const onSubmit: SubmitHandler<z.infer<typeof forgottenPasswordSchema>> = (data) => {
    console.log('Submitting', data)
    console.log('errors', errors)
  }

  return (
    <main className={styles.main}>
      <h1>Mot de passe oublié</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.forgottenPasswordForm}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
        <div>
          <label>Adresse e-mail</label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='email'
                placeholder='jean.bombeur@email.com'
              />
            )}
          />
          {(errors.email != null) && <span>{errors.email.message}</span>}
        </div>

        <Button type='primary' htmlType='submit'>
          Réinitialiser le mot de passe
        </Button>
      </form>
    </main>
  )
}
