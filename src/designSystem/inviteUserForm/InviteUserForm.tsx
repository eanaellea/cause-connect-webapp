import { FC } from 'react'
import { Button, Input } from 'antd'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import styles from './InviteUserForm.module.scss'
import { RoleSelect } from '@/components/roleSelect/RoleSelect'

const inviteUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.string()
})

export const InviteUserForm: FC = () => {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<z.infer<typeof inviteUserSchema>>({
    resolver: zodResolver(inviteUserSchema)
  })
  const onSubmit: SubmitHandler<z.infer<typeof inviteUserSchema>> = (data) => {
    console.log('Sumitting', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.updateAssocitaionForm}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
      <div className={styles.formContent}>
        <div className={styles.formControl}>
          <label>Prénom de l'utilisateur</label>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='Jean'
              />
            )}
          />
          {(errors.firstName != null) && <span>{errors.firstName.message}</span>}
        </div>
        <div className={styles.formControl}>
          <label>Nom de l'utilisateur</label>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='Bombeur'
              />
            )}
          />
          {(errors.lastName != null) && <span>{errors.lastName.message}</span>}
        </div>
        <div className={styles.formControl}>
          <label>Adresse e-mail de l'utilisateur</label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='user@email.com'
              />
            )}
          />
          {(errors.email != null) && <span>{errors.email.message}</span>}
        </div>
        <div className={styles.formControl}>
          <label>Rôle de l'utilisateur</label>
          <Controller
            name='role'
            control={control}
            render={({ field }) => (
              <RoleSelect onChange={(value) => {
                field.onChange(value)
              }}
              />
            )}
          />
          {(errors.firstName != null) && <span>{errors.firstName.message}</span>}
        </div>
      </div>

      <Button type='primary' htmlType='submit' disabled={!isValid}>
        Inviter l'utilisateur
      </Button>
    </form>
  )
}
