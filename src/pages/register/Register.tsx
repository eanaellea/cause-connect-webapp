import { Input, Divider, Button, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useState } from 'react'

import styles from './Register.module.scss'
import { ImageUpload } from '@/designSystem/ImageUpload'
import { registerAction } from '@/store/authSlice/actions'

const registerSchema = z.object({
  admin: z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string()
  }),
  association: z.object({
    name: z.string(),
    description: z.string()
  }),
  terms: z.boolean().refine(val => val, {
    message: 'Ce champ est obligatoire'
  })
})

export const Register: FC = () => {
  const [logo, setLogo] = useState<File | null>(null)
  const [sent, setSent] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema)
  })
  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = (data) => {
    setSent(true)
    void registerAction(data, logo)
  }

  return (
    <main className={styles.main}>
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
        <div className={styles.formContent}>
          <div className={styles.formColumn}>
            <div className={`${styles.formControl} ${styles.logoUpload}`}>
              <label>Logo de l'association</label>
              <ImageUpload
                onChange={(file) => setLogo(file)}
              />
            </div>
            <div className={styles.formControl}>
              <label>Nom de l'association</label>
              <Controller
                name='association.name'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder='My association'
                  />
                )}
              />
              {((errors.association?.name) != null) && <span>{errors.association.name.message}</span>}
            </div>
            <div className={styles.formControl}>
              <label>Description de l'association</label>
              <Controller
                name='association.description'
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    status={((errors.association?.description) != null) ? 'error' : ''}
                    placeholder='Description of my association'
                  />
                )}
              />
              {((errors.association?.description) != null) && <span>{errors.association.description.message}</span>}
            </div>
          </div>

          <Divider type='vertical' className={styles.verticalDivider} />

          <div className={styles.formColumn}>
            <div className={styles.formControlsContainer}>
              <div className={styles.formControl}>
                <label className={styles.adminFieldLabel}>Prénom de l'administrateur</label>
                <Controller
                  name='admin.firstName'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder='John'
                    />
                  )}
                />
                {((errors.admin?.firstName) != null) && <span>{errors.admin.firstName.message}</span>}
              </div>
              <div className={styles.formControl}>
                <label className={styles.adminFieldLabel}>Nom de l'administrateur</label>
                <Controller
                  name='admin.lastName'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder='Doe'
                    />
                  )}
                />
                {((errors.admin?.lastName) != null) && <span>{errors.admin.lastName.message}</span>}
              </div>
              <div className={styles.formControl}>
                <label className={styles.adminFieldLabel}>Adresse e-mail de l'administrateur</label>
                <Controller
                  name='admin.email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type='email'
                      placeholder='admin@email.com'
                    />
                  )}
                />
                {((errors.admin?.email) != null) && <span>{errors.admin.email.message}</span>}
              </div>
            </div>
            <div className={styles.terms}>
              <Divider type='horizontal' className={styles.horizontalDivider} />
              <div className={styles.formControl}>
                <Controller
                  name='terms'
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                    >
                      J'accepte les <Link to='/cgu'>Conditions Générales d'Utilisation</Link>
                    </Checkbox>
                  )}
                />
                {(errors.terms != null) && <span>{errors.terms.message}</span>}
              </div>
            </div>
          </div>
        </div>

        <Button type='primary' loading={sent} htmlType='submit'>
          S'inscrire
        </Button>
      </form>
    </main>
  )
}
