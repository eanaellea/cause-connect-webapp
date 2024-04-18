import { FC, useState } from 'react'
import { Space, ColorPicker, Select, Divider, Button } from 'antd'
import { Color } from 'antd/es/color-picker'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import styles from './Theme.module.scss'
import { updateThemeAction } from '@/store/settingsSlice/actions'
import { useGlobalStore } from '@/store/store'

const themeSchema = z.object({
  color: z.string(),
  font: z.string()
})

interface ThemeFont {
  '--custom-font': string
}

interface ThemeColor {
  '--custom-color': string
}

export const Theme: FC = () => {
  const [previewFont, setPreviewFont] = useState<ThemeFont>({
    '--custom-font': useGlobalStore((state) => state.theme.font!) // eslint-disable-line @typescript-eslint/no-non-null-assertion
  })
  const [previewColor, setPreviewColor] = useState<ThemeColor>({
    '--custom-color': useGlobalStore((state) => state.theme.color!) // eslint-disable-line @typescript-eslint/no-non-null-assertion
  })

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<z.infer<typeof themeSchema>>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      color: previewColor['--custom-color'],
      font: previewFont['--custom-font']
    }
  })
  const onSubmit: SubmitHandler<z.infer<typeof themeSchema>> = (data) => {
    void updateThemeAction(data)
  }

  const handleColorChange = (value: Color): void => {
    setValue('color', value.toHexString())
    setPreviewColor(() => ({
      '--custom-color': value.toHexString()
    }))
  }

  const handleFontChange = (value: string): void => {
    setValue('font', value)
    setPreviewFont(() => ({
      '--custom-font': value
    }))
  }

  return (
    <section>
      <h2>Thème</h2>
      <form onSubmit={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
        <div className={styles.container}>
          <Space direction='vertical'>
            <label>Couleur primaire</label>
            <Controller
              name='color'
              control={control}
              render={({ field }) => (
                <ColorPicker
                  value={field.value}
                  onChange={handleColorChange}
                  showText
                />
              )}
            />
            {((errors.color) != null) && <span>{errors.color.message}</span>}

            <label>Police</label>
            <Controller
              name='font'
              control={control}
              render={() => (
                <Select
                  className={styles.fontSelect}
                  placeholder='Sélectionnez une police'
                  onChange={handleFontChange}
                  defaultValue={previewFont['--custom-font']}
                >
                  <Select.Option value='Arial'>Arial</Select.Option>
                  <Select.Option value='Courier'>Courier</Select.Option>
                  <Select.Option value='Garamond'>Garamond</Select.Option>
                  <Select.Option value='Georgia'>Georgia</Select.Option>
                  <Select.Option value='Inter'>Inter</Select.Option>
                  <Select.Option value='Times New Roman'>Times New Roman</Select.Option>
                  <Select.Option value='Trebuchet MS'>Trebuchet MS</Select.Option>
                  <Select.Option value='Verdana'>Verdana</Select.Option>
                </Select>
              )}
            />
            {((errors.font) != null) && <span>{errors.font.message}</span>}

            <Button className={styles.saveButton} type='primary' htmlType='submit'>Enregistrer les modifications</Button>
          </Space>
          <Divider type='vertical' className={styles.verticalDivider} />
          <Space direction='vertical'>
            <h3>Aperçu</h3>
            <div style={{ backgroundColor: 'var(--ant-color-white)', padding: '1rem', borderRadius: 'var(--ant-border-radius)' }}>
              <div
                id={styles.preview}
                style={previewFont as any}
              >
                <h1>Lorem ipsum</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque leo nisi, dictum sit amet dignissim id, tristique ut nibh. Morbi sit amet dui vel ipsum bibendum ultrices.</p>
                <Button type='primary' id={styles.button} style={previewColor as any}>Bouton</Button>
              </div>
            </div>
          </Space>
        </div>
      </form>
    </section>
  )
}
