import { Input } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  admin: z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  association: z.object({
    name: z.string(),
    logo: z.string().optional(),
    description: z.string(),
  }),
});

export const SignUp = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = (data) => {
    console.log('Submitting', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>Admin infos</h2>
        <div>
          <label>Admin email</label>
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
        <div>
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
        <div>
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
      </div>
      <div>
        <h2>Association infos</h2>
        <div>
          <label>Association name</label>
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
        <div>
          <label>Association description</label>
          <Controller
            name="association.description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder='Description of my association'
              />
            )}
          />
          {errors.association?.description && <span>{errors.association.description.message}</span>}
        </div>
      </div>
      <input type="submit" />
    </form>
  )
}