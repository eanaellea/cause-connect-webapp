import { Input } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const createAssociationSchema = z.object({
  admin: z.object({
    email: z.string().email(),
    fullName: z.string(),
  }),
  association: z.object({
    name: z.string(),
    logo: z.string().optional(),
    description: z.string(),
  }),
});

export const CreateAssociation = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof createAssociationSchema>>({
    resolver: zodResolver(createAssociationSchema),
  })
  const onSubmit: SubmitHandler<z.infer<typeof createAssociationSchema>> = (data) => {
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
          <label>Admin full name</label>
          <Controller
            name="admin.fullName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='John Doe'
              />
            )}
          />
          {errors.admin?.fullName && <span>{errors.admin.fullName.message}</span>}
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