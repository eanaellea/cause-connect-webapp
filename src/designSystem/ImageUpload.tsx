import { FC, useState } from 'react'
import { Modal, Upload } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface ImageUploadProps {
  initialImage?: string
  onChange: (file: File) => void
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = async (file: FileType): Promise<string> =>
  await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const ImageUpload: FC<ImageUploadProps> = ({ initialImage, onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: initialImage
  }])

  const handleCancel = (): void => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (file.url == null && file.preview == null) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url ?? (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name ?? file.url!.substring(file.url!.lastIndexOf('/') + 1)) // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    const file = newFileList[0]?.originFileObj as File
    if (file != null) {
      onChange(file)
    }
  }

  return (
    <>
      <Upload
        beforeUpload={() => false}
        listType='picture-circle'
        defaultFileList={initialImage !== undefined || initialImage === '' ? fileList : []}
        onPreview={handlePreview} // eslint-disable-line @typescript-eslint/no-misused-promises
        onChange={handleChange}
        accept='image/png, image/jpeg, image/jpg'
        className='imageUpload'
        maxCount={1}
      >
        <button style={{ border: 0, background: 'none' }} type='button'>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Importer</div>
        </button>
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}
