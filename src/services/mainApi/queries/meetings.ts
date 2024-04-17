import { query } from '../setup'
import { Vote } from './votes'

export interface MeetingInfoForEventResponse {
  id: string
  agendum: string
  votes: Vote[]
}

export const getMeetingInfoForEvent = async (eventId: string): Promise<MeetingInfoForEventResponse | null> => {
  try {
    const response = await query.get(`meetings/for-event/${eventId}`)
    return await response.json<MeetingInfoForEventResponse>()
  } catch (e) {
    return null
  }
}
