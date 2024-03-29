import { Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

import styles from './LogIn.module.scss'
import { loginQuery } from '@/services/mainApi/queries/auth';
import { SearchableSelect } from '@/designSystem/SearchableSelect';
import { Association } from '@/models/Association';
import { getAssociationsQuery } from '@/services/mainApi/queries/associations';

const logInSchema = z.object({
  associationId: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const LogIn = () => {
  const [associations, setAssociations] = useState<Association[] | null>([])

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  })
  const onSubmit: SubmitHandler<z.infer<typeof logInSchema>> = (data) => {
    loginQuery(data)
    // TODO: handle login response
  }

  useEffect(() => {
    getAssociationsQuery().then((data) => {
      setAssociations(data)
    })
  }, [])

  return (
    <main className={styles.main} >
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.logInForm}>
        <div className={styles.formControl}>
          <label>Association</label>
          <Controller
            name="associationId"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                {...field}
                placeholder='Sélectionner une association'
                options={associations?.map((association) => (
                  { value: association.id, label: association.name}
                )) ?? []}
                onChange={(association) => {
                  setValue('associationId', association)
                }}
              />
            )}
          />
          {errors.associationId && <span>{errors.associationId.message}</span>}
        </div>
        <div className={styles.formControl}>
          <label>Adresse e-mail</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder='jean.bombeur@email.com'
              />
            )}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className={styles.formControl}>
          <label>Mot de passe</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder='Mot de passe'
              />
            )}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <Button type="primary" htmlType="submit">
          Se connecter
        </Button>
      </form>
    </main>
  )
}