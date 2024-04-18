import { Input, Button } from 'antd'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useGlobalStore } from '@/store/store'

import styles from './ResetPassword.module.scss'
import { resetPasswordAction } from '@/store/authSlice/actions'

const forgottenPasswordSchema = z.object({
  passwordResetCode: z.string(),
  newPassword: z.string().min(8)
})

interface ResetPasswordProps {
  title: string
  buttonContent: string
}

export const ResetPassword: FC<ResetPasswordProps> = ({ title, buttonContent }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof forgottenPasswordSchema>>({
    resolver: zodResolver(forgottenPasswordSchema)
  })
  const onSubmit: SubmitHandler<z.infer<typeof forgottenPasswordSchema>> = (data) => {
    void resetPasswordAction(data)
  }

  const email = useGlobalStore((state) => state.user?.email ?? '')

  return (
    <main className={styles.main}>
      <h1>{title}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.forgottenPasswordForm}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
        <div>
          <label>Code de réinitialisation (envoyé par email{email})</label>
          <Controller
            name='passwordResetCode'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='text'
                placeholder='Code de réinitialisation'
              />
            )}
          />
          {(errors.passwordResetCode != null) && <span>{errors.passwordResetCode.message}</span>}
        </div>
        <div>
          <label>Nouveau mot de passe</label>
          <Controller
            name='newPassword'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='password'
                placeholder='Nouveau mot de passe'
              />
            )}
          />
          {(errors.newPassword != null) && <span>{errors.newPassword.message}</span>}
        </div>

        <Button type='primary' htmlType='submit'>
          {buttonContent}
        </Button>
      </form>
    </main>
  )
}
