import { Button, Divider, Input, Modal, Select } from 'antd'
import { FC } from 'react'
import styles from './CreateVoteModal.module.scss'
import { z } from 'zod'
import { VoteAcceptanceCriteria, VoteVisibility } from '@/services/mainApi/queries/votes'
import { Controller, FieldError, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DeleteOutlined } from '@ant-design/icons'
import { createVoteAction } from '@/store/votesSlice/actions'
import { CreateVoteBodySchema } from '../types'
import { PollQuestionType } from '@/services/mainApi/types'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateVoteModal: FC<Props> = ({ open, onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof CreateVoteBodySchema>>({
    resolver: zodResolver(CreateVoteBodySchema)
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'question.options'
  })

  const onSubmit: SubmitHandler<z.infer<typeof CreateVoteBodySchema>> = async (data) => {
    await createVoteAction(data)
    onClose()
  }

  return (
    <Modal
      title='Créer un vote'
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)} /* eslint-disable-line @typescript-eslint/no-misused-promises */
      footer={[
        <Button key='back' onClick={onClose}>Annuler</Button>,
        <Button key='submit' type='primary' onClick={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
          Créer
        </Button>
      ]}
    >
      <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
        <div>
          <label>Titre</label>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='text'
                placeholder='Titre'
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
                  <Select.Option value=''>Sélectionner une visibiltié</Select.Option>
                  <Select.Option value={VoteVisibility.PUBLIC}>Public</Select.Option>
                  <Select.Option value={VoteVisibility.PRIVATE}>Privé</Select.Option>
                </Select>
              )}
            />
          </div>
          {(errors.visibility != null) && <span>{errors.visibility.message}</span>}
        </div>

        <div>
          <label className={styles.label}>Pourcentage minimum de réponses</label>
          <Controller
            name='minPercentAnswers'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='number'
                placeholder='Pourcentage minimum de réponses'
                onChange={(event) => field.onChange(+event.target.value)}
              />
            )}
          />
          {(errors.minPercentAnswers != null) && <span>{errors.minPercentAnswers.message}</span>}
        </div>

        <div>
          <div className={styles.selectWithLabel}>
            <label>Critère de validité</label>
            <Controller
              name='acceptanceCriteria'
              control={control}
              render={({ field }) => (
                <Select {...field} defaultValue='' className={styles.selectInput}>
                  <Select.Option value=''>Choisir un critère</Select.Option>
                  <Select.Option value={VoteAcceptanceCriteria.MAJORITY}>Majorité</Select.Option>
                  <Select.Option value={VoteAcceptanceCriteria.TWO_THIRDS}>Deux tiers</Select.Option>
                  <Select.Option value={VoteAcceptanceCriteria.UNANIMITY}>Unanimité</Select.Option>
                </Select>
              )}
            />
          </div>
          {(errors.acceptanceCriteria != null) && <span>{errors.acceptanceCriteria.message}</span>}
        </div>
        <Divider type='horizontal' />
        <h3>Question</h3>
        <div>
          <label>Question</label>
          <Controller
            name='question.prompt'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='text'
                placeholder='Prompt'
              />
            )}
          />
          {(errors.question?.prompt != null) && <span>{errors.question.prompt.message}</span>}
        </div>
        <div>
          <div className={styles.selectWithLabel}>
            <label>Type</label>
            <Controller
              name='question.type'
              control={control}
              render={({ field }) => (
                <Select {...field} defaultValue='' className={styles.selectInput}>
                  <Select.Option value=''>Choisir un type</Select.Option>
                  <Select.Option value={PollQuestionType.SINGLE_CHOICE}>Choix unique</Select.Option>
                  <Select.Option value={PollQuestionType.MULTIPLE_CHOICE}>Choix multiple</Select.Option>
                </Select>
              )}
            />
          </div>
          {(errors.question?.type != null) && <span>{(errors.question.type as FieldError).message}</span>}
        </div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <label>Option {index + 1}</label>
            <div className={styles.option}>
              <Controller
                name={`question.options.${index}.content`}
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
        >
          Ajouter une option
        </Button>
      </form>
    </Modal>
  )
}
