import { useGlobalStore } from '@/store/store'
import dayjs from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './EventPage.module.scss'
import { Button, Divider, Tag, TagProps } from 'antd'
import { addParticipantsQuery, EventVisibility, getParticipantsQuery, removeParticipantsQuery } from '@/services/mainApi/queries/events'
import { EditOutlined } from '@ant-design/icons'
import { EditEventModal } from '@/components/events/editEventModal/EditEventModal'
import { refetchEventsAction } from '@/store/eventsSlice/actions'
import { getMeetingInfoForEvent, MeetingInfoForEventResponse } from '@/services/mainApi/queries/meetings'
import { UserResponse } from '@/services/mainApi/queries/users'
import { UserSelectionModal } from './userSelectionModal/UserSelectionModal'

const colorPerVisibility: Record<EventVisibility, TagProps['color']> = {
  [EventVisibility.PUBLIC]: 'green',
  [EventVisibility.PRIVATE]: 'red'
}

export const EventPage: FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [meeting, setMeeting] = useState<MeetingInfoForEventResponse | null>(null)
  const [participants, setParticipants] = useState<UserResponse[]>([])
  const [isUserSelectionModalOpen, setIsUserSelectionModalOpen] = useState(false)

  const { eventId } = useParams<{ eventId: string }>()
  const event = useGlobalStore((state) => state.eventsById[eventId ?? ''])

  useEffect(() => {
    const fetchMeeting = async (): Promise<void> => {
      if (eventId === undefined) return
      const meetingInfo = await getMeetingInfoForEvent(eventId)
      setMeeting(meetingInfo)
    }
    void fetchMeeting()

    const fetchParticipants = async (): Promise<void> => {
      if (eventId === undefined) return
      const users = await getParticipantsQuery(eventId)
      if (users === null) return
      setParticipants(users)
    }
    void fetchParticipants()
  }, [eventId])

  if (eventId === undefined || event === undefined) {
    void refetchEventsAction()
    return null
  }

  const handleCloseUserModal = async (userIds: string[]): Promise<void> => {
    const userIdsToRemove = participants.map((user) => user.id).filter((id) => !userIds.includes(id))
    const userIdsToAdd = userIds.filter((id) => !participants.map((user) => user.id).includes(id))

    setIsUserSelectionModalOpen(false)

    await addParticipantsQuery(eventId, { participantIds: userIdsToAdd })
    await removeParticipantsQuery(eventId, { participantIds: userIdsToRemove })
    const users = await getParticipantsQuery(eventId)
    if (users === null) return
    setParticipants(users)
  }

  return (
    <>
      <div>
        <h1 className={styles.title}>{event.title} <Button type='primary' icon={<EditOutlined />} onClick={() => setIsEditModalOpen(true)} /></h1>
        <p>{event.description}</p>
        <p>Visibility: <Tag color={colorPerVisibility[event.visibility]}>{event.visibility}</Tag></p>
        <p>From <strong>{dayjs(event.startTime).format('DD/MM/YYYY HH:mm')}</strong> to <strong>{dayjs(event.endTime).format('DD/MM/YYYY HH:mm')}</strong></p>
        {event.summary != null && (
          <p className={styles.summary}>{event.summary}</p>
        )}
      </div>
      <Divider type='horizontal' />
      <div>
        <div>
          <div className={styles.title}>
            <h2>Participants</h2>
            <Button type='primary' onClick={() => setIsUserSelectionModalOpen(true)} icon={<EditOutlined />} />
          </div>
        </div>
        <ul>
          {participants.map((user) => (
            <li key={user.id}>{user.fullName}</li>
          ))}
        </ul>
      </div>
      <Divider type='horizontal' />
      {meeting != null && (
        <div>
          <h2>Meeting</h2>
          <p>{meeting.agendum}</p>
          {meeting.votes?.length > 0 && (
            <>
              <h3>Votes</h3>
              <ul>
                {meeting.votes.map((vote) => (
                  <Link key={vote.id} to={`/app/votes/${vote.id}`}>{vote.title}</Link>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
      <EditEventModal eventId={eventId} open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <UserSelectionModal
        open={isUserSelectionModalOpen}
        onClose={(userIds: string[]) => { void handleCloseUserModal(userIds) }}
        initialSelectedUserIds={participants.map((user) => user.id)}
      />
    </>
  )
}
