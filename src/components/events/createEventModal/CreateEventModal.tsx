import { FC, useState } from 'react'
import dayjs from 'dayjs'
import { Button, Checkbox, DatePicker, Divider, Input, Modal, Select } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { EventVisibility } from '@/services/mainApi/queries/events'
import { createEventAction, CreateEventBodySchema } from '@/store/eventsSlice/actions'

import styles from './CreateEventModal.module.scss'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateEventModal: FC<Props> = ({ open, onClose }) => {
  const [meeting, setMeeting] = useState<{ agendum: string } | undefined>(undefined)
  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof CreateEventBodySchema>>({
    resolver: zodResolver(CreateEventBodySchema)
  })

  const onSubmit = async (data: z.infer<typeof CreateEventBodySchema>): Promise<void> => {
    await createEventAction({ data, meeting })
    onClose()
  }

  return (
    <Modal
      title={`Create ${meeting !== undefined ? 'Événement et assemblée générale' : 'Événement'}`}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key='back' onClick={onClose}>Annuler</Button>,
        <Button key='submit' type='primary' onClick={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
          Sauvegarder
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
                  <Select.Option value=''>Pick a Visibility</Select.Option>
                  <Select.Option value={EventVisibility.PUBLIC}>Public</Select.Option>
                  <Select.Option value={EventVisibility.PRIVATE}>Private</Select.Option>
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
                  format='DD/MM/YYYY HH:mm'
                  showTime
                  showHour
                  showMinute
                  value={dayjs(field.value)}
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
        <Divider type='horizontal' />
        <h2>Assemblée générale</h2>
        <div className={styles.createMeetingConfirmation}>
          <label>Créer une assemblée générale</label>
          <Checkbox
            className={styles.checkbox}
            checked={meeting !== undefined}
            onChange={(event) => setMeeting(event.target.checked ? { agendum: '' } : undefined)}
          />
        </div>
        <div>
          <label>Ordre du jour</label>
          <Input.TextArea
            disabled={meeting === undefined}
            value={meeting?.agendum}
            onChange={(event) => setMeeting({ agendum: event.target.value })}
            placeholder='Agendum'
          />
        </div>
      </form>
    </Modal>
  )
}
