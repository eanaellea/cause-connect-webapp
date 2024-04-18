import { z } from 'zod'
import { query } from '../setup'
import { Vote } from './votes'
import { createEventSchema, EventResponse } from './events'

export interface MeetingInfoForEventResponse {
  id: string
  agendum: string
  votes: Vote[]
}

export const createMeetingSchema = z.object({
  agendum: z.string(),
  event: createEventSchema
})

export interface MeetingResponse {
  id: string
  agendum: string
  event: EventResponse
}

export const getMeetingInfoForEvent = async (eventId: string): Promise<MeetingInfoForEventResponse | null> => {
  try {
    const response = await query.get(`meetings/for-event/${eventId}`)
    const meetingInfo = await response.json<MeetingInfoForEventResponse>()
    if (meetingInfo.id === undefined) {
      return null
    }
    return meetingInfo
  } catch (e) {
    return null
  }
}

export const addVoteToMeetingQuery = async (meetingId: string, voteId: string): Promise<Vote | null> => {
  try {
    const response = await query.post(`meetings/${meetingId}/votes`, { json: { voteId } })
    return await response.json<Vote>()
  } catch (e) {
    return null
  }
}

export const removeVoteFromMeetingQuery = async (meetingId: string, voteId: string): Promise<void> => {
  await query.delete(`meetings/${meetingId}/votes/${voteId}`)
}

export const getVotesForMeetingQuery = async (meetingId: string): Promise<Vote[] | null> => {
  try {
    const response = await query.get(`meetings/${meetingId}/votes`)
    return await response.json<Vote[]>()
  } catch (e) {
    return null
  }
}

export const createMeetingQuery = async (meeting: z.infer<typeof createMeetingSchema>): Promise<MeetingResponse | null> => {
  try {
    const response = await query.post('meetings', { json: meeting })
    return await response.json<MeetingResponse>()
  } catch (e) {
    return null
  }
}
