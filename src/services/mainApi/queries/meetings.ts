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
