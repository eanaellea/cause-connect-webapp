import { FC, useState } from 'react'
import { Button, Input, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import styles from './UploadPlugIn.module.scss'
import { createPluginAction } from '@/store/pluginsSlice/actions'
import toast from 'react-hot-toast'

const CreatePluginSchema = z.object({
  name: z.string(),
  description: z.string(),
  author: z.string()
})

export const UploadPlugIn: FC = () => {
  const [loading, setLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const { control, handleSubmit, formState: { errors, isValid }, setValue } = useForm<z.infer<typeof CreatePluginSchema>>({
    resolver: zodResolver(CreatePluginSchema)
  })
  const onSubmit: SubmitHandler<z.infer<typeof CreatePluginSchema>> = (data) => {
    if (uploadedFile !== null) {
      const result = Boolean(createPluginAction(uploadedFile, data))
      if (result) {
        setUploadedFile(null)
        setValue('name', '')
        setValue('description', '')
        setValue('author', '')
        toast.success('Le plugin a bien été publié')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.uploadPluginForm}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
      <div className={styles.formContent}>
        <div className={styles.formControl}>
          <label>Nom</label>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='Mon plugin'
              />
            )}
          />
          {(errors.name != null) && <span>{errors.name.message}</span>}
        </div>
        <div className={styles.formControl}>
          <label>Description</label>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='Ce plugin fait des choses incroyables'
              />
            )}
          />
          {(errors.description != null) && <span>{errors.description.message}</span>}
        </div>
        <div className={styles.formControl}>
          <label>Nom de l'auteur</label>
          <Controller
            name='author'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='Jean Bombeur'
              />
            )}
          />
          {(errors.author != null) && <span>{errors.author.message}</span>}
        </div>
        <div className={styles.formControl}>
          <label>Fichier</label>
          <Upload
            type='drag'
            accept='application/java-archive'
            defaultFileList={[]}
            maxCount={1}
            onRemove={() => setUploadedFile(null)}
            beforeUpload={(file) => { setLoading(true); setUploadedFile(file); return false }}
            onChange={() => setLoading(false)}
          >
            <button style={{ border: 0, background: 'none' }} type='button'>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div>Importer</div>
            </button>
          </Upload>
        </div>
      </div>

      <Button type='primary' htmlType='submit' disabled={!isValid || uploadedFile === null}>
        Publier le plugin
      </Button>
    </form>
  )
}
