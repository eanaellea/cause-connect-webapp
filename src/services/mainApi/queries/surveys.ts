import { query } from '../setup'
import { NewPollQuestion, PollQuestionResponse } from '../types'

export enum SurveyVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export interface Survey {
  id: string
  title: string
  description: string
  visibility: SurveyVisibility
}

export interface FullSurveyResponse extends Survey {
  questions: PollQuestionResponse[]
}

export interface CreateSurveyBody {
  title: string
  description: string
  visibility: SurveyVisibility
  questions: NewPollQuestion[]
}

export interface AnswerSurveyBody {
  answers: Array<{
    questionId: string
    optionIds: string[]
  }>
}

// Fetch all public surveys for the user's association
export const fetchSurveys = async (): Promise<Survey[] | null> => {
  try {
    const response = await query.get('surveys')
    return await response.json<Survey[]>()
  } catch (e) {
    return null
  }
}

// Create a new survey
export const createSurvey = async (body: CreateSurveyBody): Promise<Survey | null> => {
  try {
    const response = await query.post('surveys', {
      json: body
    })
    return await response.json<Survey>()
  } catch (e) {
    return null
  }
}

// Fetch full details of a survey by ID
export const fetchSurveyDetails = async (surveyId: string): Promise<FullSurveyResponse | null> => {
  try {
    const response = await query.get(`surveys/${surveyId}`)
    return await response.json<FullSurveyResponse>()
  } catch (e) {
    return null
  }
}

// Delete a survey
export const deleteSurvey = async (surveyId: string): Promise<void> => {
  try {
    await query.delete(`surveys/${surveyId}`)
  } catch (e) {
    // handle error
  }
}

// Replace a survey
export const replaceSurvey = async (surveyId: string, body: CreateSurveyBody): Promise<FullSurveyResponse | null> => {
  try {
    const response = await query.put(`surveys/${surveyId}`, {
      json: body
    })
    return await response.json<FullSurveyResponse>()
  } catch (e) {
    return null
  }
}

// Submit answers to a survey
export const submitSurveyAnswers = async (surveyId: string, body: AnswerSurveyBody): Promise<void> => {
  try {
    await query.post(`surveys/${surveyId}/answers`, {
      json: body
    })
  } catch (e) {
    // handle error
  }
}

// Fetch survey results
export const fetchSurveyResults = async (surveyId: string): Promise<any> => { // Specify the return type according to actual results structure
  try {
    const response = await query.get(`surveys/${surveyId}/results`)
    return await response.json()
  } catch (e) {
    return null
  }
}
