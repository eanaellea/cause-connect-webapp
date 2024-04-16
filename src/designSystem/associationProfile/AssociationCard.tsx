import { FC, useState } from 'react'
import { Button, Input, UploadFile } from 'antd'
import { Association } from '../../store/types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { ImageUpload } from '@/designSystem/ImageUpload'
import styles from './AssociationCard.module.scss'
import { updateAssociationAction, updateAssociationLogoAction } from '@/store/associationSlice/actions'

const updateAssocitaionSchema = z.object({
  name: z.string(),
  description: z.string()
})

interface AssociationProfileProps {
  association: Association
}

export const AssociationCard: FC<AssociationProfileProps> = ({ association }) => {
  const [logo, setLogo] = useState<UploadFile>({
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: association.logo
  })

  const defaultValues = {
    name: association.name,
    description: association.description
  }

  const { control, handleSubmit, formState: { errors, isDirty } } = useForm<z.infer<typeof updateAssocitaionSchema>>({
    resolver: zodResolver(updateAssocitaionSchema),
    defaultValues
  })
  const onSubmit: SubmitHandler<z.infer<typeof updateAssocitaionSchema>> = (data) => {
    void updateAssociationAction(association.id, data)
  }
  const onLogoChange = (file: File): void => {
    void updateAssociationLogoAction(association.id, file)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.updateAssocitaionForm}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
      <div className={styles.formContent}>
        <div className={`${styles.formControl} ${styles.logoUpload}`}>
          <label>Logo de l'association</label>
          <ImageUpload
            initialImage={logo.url}
            onChange={(file) => {
              onLogoChange(file)
              setLogo({ ...file, uid: '-1' })
            }}
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

      <Button type='primary' htmlType='submit' disabled={!isDirty}>
        Enregistrer les modifications
      </Button>
    </form>
  )
}
