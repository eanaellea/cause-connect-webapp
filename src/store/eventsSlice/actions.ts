import { EventResponse, getAllPublicEventsQuery } from '@/services/mainApi/queries/events'
import { useGlobalStore } from '../store'

export const refetchEventsAction = async (): Promise<void> => {
  const events = await getAllPublicEventsQuery()

  if (events === null) {
    return
  }

  console.log(events)

  useGlobalStore.setState({ eventsByDate: transformEventsToRecord(events) })
}

const transformEventsToRecord = (events: EventResponse[]): Record<string, EventResponse[]> => {
  return events.reduce((acc: Record<string, EventResponse[]>, event: EventResponse) => {
    // array of all dates this event is on
    const allDates = []
    const currentDate = new Date(event.startTime)
    while (currentDate <= event.endTime) {
      allDates.push(currentDate.toISOString().split('T')[0])
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // add event to each date it is on
    const addedDates: Record<string, EventResponse[]> = {}
    allDates.forEach(dateString => {
      addedDates[dateString] = [...(acc[dateString] ?? []), event]
    })

    // merge addedDates into acc
    return {
      ...acc,
      ...addedDates
    }
  }, {})
}
