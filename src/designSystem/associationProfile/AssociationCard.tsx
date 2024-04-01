import { FC, useState } from "react"
import { Button, Input, UploadFile } from "antd"
import { Association } from "@/models/Association"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { ImageUpload } from '@/designSystem/ImageUpload'
import styles from './AssociationCard.module.scss'

const updateAssocitaionSchema = z.object({
  name: z.string(),
  description: z.string()
})

interface AssociationProfileProps {
  association: Association
}

export const AssociationCard: FC<AssociationProfileProps> = ({association}) => {
  const [newLogo, setLogo] = useState<UploadFile>({
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: association.logo
  })

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof updateAssocitaionSchema>>({
    resolver: zodResolver(updateAssocitaionSchema),
    defaultValues: {
      name: association.name,
      description: association.description
    }
  })
  const onSubmit: SubmitHandler<z.infer<typeof updateAssocitaionSchema>> = (data) => {
    console.log('Submitting', data, newLogo)
  }

  return (
  <form onSubmit={handleSubmit(onSubmit)} className={styles.updateAssocitaionForm}>
    <div className={styles.formContent}>
      <div className={`${styles.formControl} ${styles.logoUpload}`}>
        <label>Logo de l'association</label>
        <ImageUpload
          initialImage={newLogo.url}
          onChange={(file) => setLogo({ ...file, uid: '-1' })}
        />
      </div>
      <div className={styles.formControl}>
        <label>Nom de l'association</label>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder='My association'
            />
          )}
        />
        {(errors.name != null) && <span>{errors.name.message}</span>}
      </div>
      <div className={styles.formControl}>
        <label>Description de l'association</label>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              status={(errors.description != null) ? 'error' : ''}
              placeholder='Description of my association'
            />
          )}
        />
        {(errors.description != null) && <span>{errors.description.message}</span>}
      </div>
    </div>

    <Button type='primary' htmlType='submit'>
      Enregistrer les modifications
    </Button>
  </form>
  )
}