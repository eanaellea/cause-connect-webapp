import { Vote, VoteAcceptanceCriteria, VoteStatus, VoteVisibility } from '@/services/mainApi/queries/votes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Checkbox, Divider, Input, Modal, Select } from 'antd'
import { FC, useState } from 'react'
import { Controller, FieldError, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import styles from './EditVoteModal.module.scss'
import { CreateVoteBodySchema } from '../types'
import { DeleteOutlined } from '@ant-design/icons'
import { useGlobalStore } from '@/store/store'
import { openBallotAndRefreshVoteAction, updateAndRefreshVoteAction } from '@/store/votesSlice/actions'
import { PollQuestionType } from '@/services/mainApi/types'

interface Props {
  vote: Vote
  open: boolean
  onClose: () => void
}

export const EditVoteModal: FC<Props> = ({ vote, open, onClose }) => {
  const currentDisplayedVote = useGlobalStore((state) => state.currentDisplayedVote)

  const [isCreatingNewBallot, setIsCreatingNewBallot] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof CreateVoteBodySchema>>({
    defaultValues: currentDisplayedVote ?? {},
    resolver: zodResolver(CreateVoteBodySchema)
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'question.options'
  })

  const notEditableStatuses = [VoteStatus.OPEN, VoteStatus.DONE]

  if (currentDisplayedVote == null) {
    return null
  }

  const isNotEditable = notEditableStatuses.includes(currentDisplayedVote.status)

  const onSubmit: SubmitHandler<z.infer<typeof CreateVoteBodySchema>> = async (data) => {
    const { question, ...voteInfo } = data

    await updateAndRefreshVoteAction(vote.id, voteInfo)

    if (isCreatingNewBallot) {
      await openBallotAndRefreshVoteAction(vote.id, question)
      setIsCreatingNewBallot(false)
    }
  }

  return (
    <Modal
      title={`Modifier le vote ${vote.title}`}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)} /* eslint-disable-line @typescript-eslint/no-misused-promises */
      footer={[
        <Button key='back' onClick={onClose}>Annuler</Button>,
        <Button key='submit' type='primary' onClick={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
          Modifier
        </Button>
      ]}
    >
      <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
        {isNotEditable && (
          <Alert type='warning' message='This vote is not editable because it is open or done.' />
        )}
        <div>
          <label>Titre</label>
          <Controller
            name='title'
            control={control}
            disabled={isNotEditable}
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
            disabled={isNotEditable}
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
              disabled={isNotEditable}
              render={({ field }) => (
                <Select {...field} defaultValue='' className={styles.selectInput}>
                  <Select.Option value=''>Pick a visibility</Select.Option>
                  <Select.Option value={VoteVisibility.PUBLIC}>Public</Select.Option>
                  <Select.Option value={VoteVisibility.PRIVATE}>Private</Select.Option>
                </Select>
              )}
            />
          </div>
          {(errors.visibility != null) && <span>{errors.visibility.message}</span>}
        </div>

        <div>
          <label className={styles.label}>Minimum Percentage of Answers</label>
          <Controller
            name='minPercentAnswers'
            control={control}
            disabled={isNotEditable}
            render={({ field }) => (
              <Input
                {...field}
                type='number'
                placeholder='Minimum Percentage of Answers'
                onChange={(event) => field.onChange(+event.target.value)}
              />
            )}
          />
          {(errors.minPercentAnswers != null) && <span>{errors.minPercentAnswers.message}</span>}
        </div>

        <div>
          <div className={styles.selectWithLabel}>
            <label>Acceptance Criteria</label>
            <Controller
              name='acceptanceCriteria'
              control={control}
              disabled={isNotEditable}
              render={({ field }) => (
                <Select {...field} defaultValue='' className={styles.selectInput}>
                  <Select.Option value=''>Pick a criteria</Select.Option>
                  <Select.Option value={VoteAcceptanceCriteria.MAJORITY}>Majority</Select.Option>
                  <Select.Option value={VoteAcceptanceCriteria.TWO_THIRDS}>Two Thirds</Select.Option>
                  <Select.Option value={VoteAcceptanceCriteria.UNANIMITY}>Unanimity</Select.Option>
                </Select>
              )}
            />
          </div>
          {(errors.acceptanceCriteria != null) && <span>{errors.acceptanceCriteria.message}</span>}
        </div>
        <Divider type='horizontal' />
        <div className={styles.newBallotHeader}>
          <h3>Question</h3>
          <label>Créer un nouveau tour</label>
          <Checkbox className={styles.checkbox} checked={isCreatingNewBallot} onChange={(event) => setIsCreatingNewBallot(event.target.checked)} />
        </div>
        {!isCreatingNewBallot && (
          <Alert type='warning' message='To modify the question, you must create a new ballot.' />
        )}
        <div>
          <label>Prompt</label>
          <Controller
            name='question.prompt'
            control={control}
            render={({ field }) => (
              <Input
                disabled={!isCreatingNewBallot}
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
                <Select {...field} defaultValue='' className={styles.selectInput} disabled={!isCreatingNewBallot}>
                  <Select.Option value=''>Pick a type</Select.Option>
                  <Select.Option value={PollQuestionType.SINGLE_CHOICE}>Single Choice</Select.Option>
                  <Select.Option value={PollQuestionType.MULTIPLE_CHOICE}>Multiple Choice</Select.Option>
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
                render={({ field }) => <Input {...field} disabled={!isCreatingNewBallot} />}
              />
              <Button disabled={!isCreatingNewBallot} type='primary' danger onClick={() => remove(index)} icon={<DeleteOutlined />} />
            </div>
          </div>
        ))}
        <Button
          type='dashed'
          onClick={() => append({ content: '' })}
          disabled={!isCreatingNewBallot}
        >
          Ajouter une option
        </Button>
      </form>
    </Modal>
  )
}
