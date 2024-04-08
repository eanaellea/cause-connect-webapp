import { z } from 'zod'
import { query } from '../setup'
import { UserResponse } from './users'

export enum EventVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  summary: z.string(),
  visibility: z.enum([EventVisibility.PUBLIC, EventVisibility.PRIVATE]),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
})

export const updateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  summary: z.string().optional(),
  visibility: z
    .enum([EventVisibility.PUBLIC, EventVisibility.PRIVATE])
    .optional(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional()
})

export interface EventResponse {
  id: string
  title: string
  description: string
  summary: string
  visibility: EventVisibility
  startTime: Date
  endTime: Date
}

export const createEventQuery = async (event: z.infer<typeof createEventSchema>): Promise<EventResponse | null> => {
  try {
    const result = await query.post('events', {
      json: event
    })
    const eventResponse = await result.json<EventResponse>()
    return parseEventResponse(eventResponse)
  } catch (e) {
    return null
  }
}

export const getAllPublicEventsQuery = async (): Promise<EventResponse[] | null> => {
  try {
    const result = await query.get('events')
    const events = await result.json<EventResponse[]>()

    return events.map(parseEventResponse)
  } catch (e) {
    return null
  }
}

export const getEventByIdQuery = async (id: string): Promise<EventResponse | null> => {
  try {
    const result = await query.get(`events/${id}`)
    const event = await result.json<EventResponse>()
    return parseEventResponse(event)
  } catch (e) {
    return null
  }
}

export const deleteEventQuery = async (id: string): Promise<EventResponse | null> => {
  try {
    const result = await query.delete(`events/${id}`)
    const event = await result.json<EventResponse>()
    return parseEventResponse(event)
  } catch (e) {
    return null
  }
}

export const updateEventQuery = async (id: string, event: z.infer<typeof updateEventSchema>): Promise<EventResponse | null> => {
  try {
    const result = await query.patch(`events/${id}`, {
      json: event
    })
    const eventResponse = await result.json<EventResponse>()
    return parseEventResponse(eventResponse)
  } catch (e) {
    return null
  }
}

export const registerForEventQuery = async (id: string): Promise<void> => {
  try {
    await query.post(`events/${id}/register`)
  } catch (e) {

  }
}

export const addParticipantsQuery = async (id: string, participants: { participantIds: string[] }): Promise<void> => {
  try {
    await query.post(`events/${id}/participants`, {
      json: participants
    })
  } catch (e) {

  }
}

export const unregisterFromEventQuery = async (id: string): Promise<void> => {
  try {
    await query.delete(`events/${id}/unregister`)
  } catch (e) {

  }
}

export const removeParticipantsQuery = async (id: string, participants: { participantIds: string[] }): Promise<void> => {
  try {
    await query.delete(`events/${id}/participants`, {
      json: participants
    })
  } catch (e) {

  }
}

export const getParticipantsQuery = async (id: string): Promise<UserResponse[] | null> => {
  try {
    const result = await query.get(`events/${id}/participants`)
    const participants = await result.json<UserResponse[]>()
    return participants
  } catch (e) {
    return null
  }
}

export const declarePresentQuery = async (id: string, user: { userId: string }): Promise<void> => {
  try {
    await query.post(`events/${id}/present`, {
      json: user
    })
  } catch (e) {

  }
}

export const declareAbsentQuery = async (id: string, user: { userId: string }): Promise<void> => {
  try {
    await query.delete(`events/${id}/present`, {
      json: user
    })
  } catch (e) {

  }
}

export const getPresentUsersQuery = async (id: string): Promise<UserResponse[] | null> => {
  try {
    const result = await query.get(`events/${id}/present`)
    const users = await result.json<UserResponse[]>()
    return users
  } catch (e) {
    return null
  }
}

function parseEventResponse (event: EventResponse): EventResponse {
  return {
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime)
  }
}
