import { Input, Modal, Upload, Divider, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react'
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from './SignUp.module.scss'

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
  terms: z.boolean().refine(val => val === true, {
    message: "Ce champ est obligatoire",
  }),
});

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const SignUp = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Importer</div>
    </button>
  );

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = (data) => {
    console.log('Submitting', data)
    console.log('errors', errors)
  }

  return (
    <main className={styles.main} >
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.signUpForm}>
        <div className={styles.formContent}>
          <div className={styles.formColumn}>
            <div className={styles.formControl}>
              <label>Logo de l'association</label>
              <Controller
                name="association.logo"
                control={control}
                render={({ field }) => (
                  <>
                    <Upload
                      {...field}
                      // TODO: add action={}
                      listType="picture-circle"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      className={styles.logoUpload}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </>
                )}
              />
              {errors.association?.logo && <span>{errors.association.logo.message}</span>}
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
          Submit
        </Button>
      </form>
    </main>
  )
}