import { Input, Button } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

import styles from './LogIn.module.scss'

const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


export const LogIn = () => {


  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  })
  const onSubmit: SubmitHandler<z.infer<typeof logInSchema>> = (data) => {
    console.log('Submitting', data)
    console.log('errors', errors)
  }

  return (
    <main className={styles.main} >
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.logInForm}>
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