import { createEventQuery, EventResponse, EventVisibility, getAllPublicEventsQuery, updateEventQuery } from '@/services/mainApi/queries/events'
import { useGlobalStore } from '../store'
import { z } from 'zod'
import { createMeetingQuery } from '@/services/mainApi/queries/meetings'

export const CreateEventBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  visibility: z.nativeEnum(EventVisibility),
  startTime: z.date(),
  endTime: z.date(),
  summary: z.string().optional()
}).refine((data) => data.endTime > data.startTime, {
  message: 'End time cannot be earlier than start time.',
  path: ['endTime']
})

export const createEventAction = async ({ data, meeting }: { data: z.infer<typeof CreateEventBodySchema>, meeting?: { agendum: string } }): Promise<void> => {
  const eventData = {
    ...data,
    summary: data.summary ?? ''
  }

  if (meeting !== undefined) {
    const meetingResponse = await createMeetingQuery({
      agendum: meeting.agendum,
      event: eventData
    })
    if (meetingResponse === null) {
      return
    }
  } else {
    const event = await createEventQuery(eventData)
    if (event === null) {
      return
    }
  }

  await refetchEventsAction()
}

export const UpdateEventBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  visibility: z.nativeEnum(EventVisibility).optional(),
  startTime: z.date(),
  endTime: z.date(),
  summary: z.string().optional()
}).refine((data) => data.endTime > data.startTime, {
  message: 'End time cannot be earlier than start time.',
  path: ['endTime']
})

export const updateEventAction = async (eventId: string, updatedData: z.infer<typeof UpdateEventBodySchema>): Promise<void> => {
  const updatedEvent = await updateEventQuery(eventId, updatedData)
  if (updatedEvent === null) {
    return
  }

  const updatedEventsById = {
    [eventId]: updatedEvent
  }

  useGlobalStore.setState({
    eventsById: {
      ...useGlobalStore.getState().eventsById,
      ...updatedEventsById
    }
  })
}

export const refetchEventsAction = async (): Promise<void> => {
  const events = await getAllPublicEventsQuery()

  if (events === null) {
    return
  }

  useGlobalStore.setState({
    eventIdsByDate: transformEventsToEventIdsByDate(events),
    eventsById: transfomEventsToEventsById(events)
  })
}

const transformEventsToEventIdsByDate = (events: EventResponse[]): Record<string, string[]> => {
  return events.reduce((acc: Record<string, string[]>, event: EventResponse) => {
    // array of all dates this event is on
    const allDates = []
    const currentDate = new Date(event.startTime)
    while (currentDate <= event.endTime) {
      allDates.push(currentDate.toISOString().split('T')[0])
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // add event to each date it is on
    const addedDates: Record<string, string[]> = {}
    allDates.forEach(dateString => {
      addedDates[dateString] = [...(acc[dateString] ?? []), event.id]
    })

    // merge addedDates into acc
    return {
      ...acc,
      ...addedDates
    }
  }, {})
}

const transfomEventsToEventsById = (events: EventResponse[]): Record<string, EventResponse> => {
  return events.reduce((acc: Record<string, EventResponse>, event: EventResponse) => {
    return {
      ...acc,
      [event.id]: event
    }
  }, {})
}
