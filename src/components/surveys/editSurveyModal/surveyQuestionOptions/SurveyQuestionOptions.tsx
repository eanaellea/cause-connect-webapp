import { Button, Input } from 'antd'
import { FC } from 'react'
import { Control, Controller, useFieldArray } from 'react-hook-form'
import { DeleteOutlined } from '@ant-design/icons'
import styles from './SurveyQuestionOptions.module.scss'

interface Props {
  questionIndex: number
  control: Control<any>
}

export const SurveyQuestionOptions: FC<Props> = ({ questionIndex, control }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`
  })

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <label>Option {index + 1}</label>
          <div className={styles.option}>
            <Controller
              name={`questions.${questionIndex}.options.${index}.content`}
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            <Button type='primary' danger onClick={() => remove(index)} icon={<DeleteOutlined />} />
          </div>
        </div>
      ))}
      <Button
        type='dashed'
        onClick={() => append({ content: '' })}
        className={styles.addOptionButton}
      >
        Ajouter une option
      </Button>
    </div>
  )
}
