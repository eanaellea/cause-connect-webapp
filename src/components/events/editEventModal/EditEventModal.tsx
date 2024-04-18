import { EventVisibility } from '@/services/mainApi/queries/events'
import { useGlobalStore } from '@/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, DatePicker, Input, Modal, Select } from 'antd'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import styles from './EditEventModal.module.scss'
import { updateEventAction, UpdateEventBodySchema } from '@/store/eventsSlice/actions'
import dayjs from 'dayjs'

interface Props {
  eventId: string
  open: boolean
  onClose: () => void
}

export const EditEventModal: FC<Props> = ({ eventId, open, onClose }) => {
  const event = useGlobalStore((state) => state.eventsById[eventId])

  const { control, handleSubmit, formState: { errors, isDirty } } = useForm<z.infer<typeof UpdateEventBodySchema>>({
    defaultValues: event ?? {},
    resolver: zodResolver(UpdateEventBodySchema)
  })

  const onSubmit = async (data: z.infer<typeof UpdateEventBodySchema>): Promise<void> => {
    await updateEventAction(eventId, data)
    onClose()
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={[
        <Button key='back' onClick={onClose}>Annuler</Button>,
        <Button disabled={!isDirty} key='submit' type='primary' onClick={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
          Modifier
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
            <label>Visibilité</label>
            <Controller
              name='visibility'
              control={control}
              render={({ field }) => (
                <Select {...field} defaultValue='' className={styles.selectInput}>
                  <Select.Option value=''>Choisir une visibilité</Select.Option>
                  <Select.Option value={EventVisibility.PUBLIC}>Public</Select.Option>
                  <Select.Option value={EventVisibility.PRIVATE}>Privé</Select.Option>
                </Select>
              )}
            />
          </div>
          {(errors.visibility != null) && <span>{errors.visibility.message}</span>}
        </div>
        <div>
          <label>Début</label>
          <Controller
            name='startTime'
            control={control}
            render={({ field }) => {
              return (
                <DatePicker
                  {...field}
                  value={dayjs(field.value)}
                  format='DD/MM/YYYY HH:mm'
                  showTime
                  showHour
                  showMinute
                  placeholder='Start Time'
                  onChange={(date) => { field.onChange(date?.toDate()) }}
                />
              )
            }}
          />
          {(errors.startTime != null) && <span>{errors.startTime.message}</span>}
        </div>
        <div>
          <label>Fin</label>
          <Controller
            name='endTime'
            control={control}
            render={({ field }) => {
              return (
                <DatePicker
                  {...field}
                  value={dayjs(field.value)}
                  format='DD/MM/YYYY HH:mm'
                  showTime
                  showHour
                  showMinute
                  placeholder='End Time'
                  onChange={(date) => { field.onChange(date?.toDate()) }}
                />
              )
            }}
          />
          {(errors.endTime != null) && <span>{errors.endTime.message}</span>}
        </div>
        <div>
          <label>Résumé</label>
          <Controller
            name='summary'
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} placeholder='Summary' />
            )}
          />
          {(errors.summary != null) && <span>{errors.summary.message}</span>}
        </div>
      </form>
    </Modal>
  )
}
