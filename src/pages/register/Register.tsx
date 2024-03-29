import { Input, Divider, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react'

import styles from './Register.module.scss'
import { ImageUpload } from '@/designSystem/ImageUpload';
import { registerQuery } from '@/services/mainApi/queries/auth';

const registerSchema = z.object({
  admin: z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  association: z.object({
    name: z.string(),
    description: z.string(),
  }),
  terms: z.boolean().refine(val => val === true, {
    message: "Ce champ est obligatoire",
  }),
});

export const Register = () => {
  const [logo, setLogo] = useState<File | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  })
  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = (data) => {
    registerQuery(data, logo)
    // TODO: Handle the response
  }

  return (
    <main className={styles.main} >
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
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
                name="association.name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder='My association'
                  />
                )}
              />
              {errors.association?.name && <span>{errors.association.name.message}</span>}
            </div>
            <div className={styles.formControl}>
              <label>Description de l'association</label>
              <Controller
                name="association.description"
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    status={errors.association?.description ? 'error' : ''}
                    placeholder='Description of my association'
                  />
                )}
              />
              {errors.association?.description && <span>{errors.association.description.message}</span>}
            </div>
          </div>

          <Divider type="vertical" className={styles.verticalDivider} />

          <div className={styles.formColumn}>
            <div className={styles.formControlsContainer}>
              <div className={styles.formControl}>
                <label>Prénom de l'administrateur</label>
                <Controller
                  name="admin.firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder='John'
                    />
                  )}
                />
                {errors.admin?.firstName && <span>{errors.admin.firstName.message}</span>}
              </div>
              <div className={styles.formControl}>
                <label>Nom de l'administrateur</label>
                <Controller
                  name="admin.lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder='Doe'
                    />
                  )}
                />
                {errors.admin?.lastName && <span>{errors.admin.lastName.message}</span>}
              </div>
              <div className={styles.formControl}>
                <label>Adresse e-mail de l'administrateur</label>
                <Controller
                  name="admin.email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder='admin@email.com'
                    />
                  )}
                />
                {errors.admin?.email && <span>{errors.admin.email.message}</span>}
              </div>
            </div>
            <div className={styles.terms}>
              <Divider type="horizontal" className={styles.horizontalDivider} />
              <div className={styles.formControl}>
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                    >
                      J'accepte les <Link to="/cgu">Conditions Générales d'Utilisation</Link>
                    </Checkbox>
                  )}
                />
                {errors.terms && <span>{errors.terms.message}</span>}
              </div>
            </div>
          </div>
        </div>

        <Button type="primary" htmlType="submit">
          S'inscrire
        </Button>
      </form>
    </main>
  )
}