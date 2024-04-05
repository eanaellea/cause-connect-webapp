import { Button, Divider, Input, Modal, Select } from 'antd'
import { FC } from 'react'
import styles from './CreateSurveyModal.module.scss'
import { z } from 'zod'
import { SurveyVisibility } from '@/services/mainApi/queries/surveys'
import { Controller, FieldError, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createSurveyAction } from '@/store/surveysSlice/actions'
import { CreateSurveyBodySchema } from '../types'
import { PollQuestionType } from '@/services/mainApi/types'
import { SurveyQuestionOptions } from './surveyQuestionOptions/SurveyQuestionOptions'
import { DeleteOutlined } from '@ant-design/icons'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateSurveyModal: FC<Props> = ({ open, onClose }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof CreateSurveyBodySchema>>({
    resolver: zodResolver(CreateSurveyBodySchema)
  })
  const { fields: questionFields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  })

  const onSubmit: SubmitHandler<z.infer<typeof CreateSurveyBodySchema>> = async (data) => {
    await createSurveyAction(data)
    reset()
    onClose()
  }

  return (
    <Modal
      title='Create a Survey'
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)} /* eslint-disable-line @typescript-eslint/no-misused-promises */
      width='80%'
      footer={[
        <Button key='back' onClick={onClose}>Cancel</Button>,
        <Button key='submit' type='primary' onClick={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
          Create
        </Button>
      ]}
    >
      <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
        <div>
          <label>Title</label>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='text'
                placeholder='Title'
              />
            )}
          />
          {(errors.title != null) && <span>{errors.title.message}</span>}
        </div>
        <div>
          <label>Description</label>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} placeholder='Description' />
            )}
          />
          {(errors.description != null) && <span>{errors.description.message}</span>}
        </div>

        <div>
          <div className={styles.selectWithLabel}>
            <label>Visibility</label>
            <Controller
              name='visibility'
              control={control}
              render={({ field }) => (
                <Select {...field} defaultValue='' className={styles.selectInput}>
                  <Select.Option value=''>Select Visibility</Select.Option>
                  <Select.Option value={SurveyVisibility.PUBLIC}>Public</Select.Option>
                  <Select.Option value={SurveyVisibility.PRIVATE}>Private</Select.Option>
                </Select>
              )}
            />
          </div>
          {(errors.visibility != null) && <span>{errors.visibility.message}</span>}
        </div>
        <Divider type='horizontal' />
        <h3>Questions</h3>
        {questionFields.map((field, questionIndex) => (
          <div key={field.id} className={styles.formContent}>
            <div className={styles.questionTitle}>
              <h4>Question {questionIndex + 1}</h4>
              <Button type='primary' danger onClick={() => remove(questionIndex)} icon={<DeleteOutlined />} />
            </div>
            <label>Prompt</label>
            <Controller
              name={`questions.${questionIndex}.prompt`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type='text'
                  placeholder='Prompt'
                />
              )}
            />
            {(errors.questions?.[questionIndex]?.prompt != null) && <span>{errors.questions[questionIndex].prompt.message}</span>}
            <div className={styles.selectWithLabel}>
              <label>Type</label>
              <Controller
                name={`questions.${questionIndex}.type`}
                control={control}
                render={({ field }) => (
                  <Select {...field} defaultValue='' className={styles.selectInput}>
                    <Select.Option value=''>Select a Type</Select.Option>
                    <Select.Option value={PollQuestionType.SINGLE_CHOICE}>Single Choice</Select.Option>
                    <Select.Option value={PollQuestionType.MULTIPLE_CHOICE}>Multiple Choice</Select.Option>
                  </Select>
                )}
              />
            </div>
            {(errors.questions?.[questionIndex]?.type != null) && <span>{(errors.questions[questionIndex].type as FieldError).message}</span>}
            <SurveyQuestionOptions control={control} questionIndex={questionIndex} />
          </div>
        ))}
        <Button
          type='dashed'
          onClick={() => append({ prompt: '', type: PollQuestionType.SINGLE_CHOICE, options: [] })}
        >
          Add Question
        </Button>
      </form>
    </Modal>
  )
}
