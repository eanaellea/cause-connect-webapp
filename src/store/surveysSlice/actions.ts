import { AnswerSurveyBody, createSurvey, CreateSurveyBody, deleteSurvey, fetchSurveys, fetchSurveyDetails, fetchSurveyResults, submitSurveyAnswers, updateSurvey, UpdateSurveyBody } from '@/services/mainApi/queries/surveys'
import { useGlobalStore } from '../store'

export const fetchSurveysAction = async (): Promise<void> => {
  const surveys = await fetchSurveys()
  if (surveys != null) {
    useGlobalStore.setState({ surveys })
  }
}

export const createSurveyAction = async (body: CreateSurveyBody): Promise<void> => {
  const newSurveyResponse = await createSurvey(body)
  if (newSurveyResponse !== null) {
    useGlobalStore.setState((state) => ({ surveys: [...state.surveys, newSurveyResponse] }))
    await fetchSurveysAction()
  }
}

export const fetchSurveyDetailsAction = async (surveyId: string): Promise<void> => {
  const surveyDetails = await fetchSurveyDetails(surveyId)
  if (surveyDetails != null) {
    useGlobalStore.setState({ currentDisplayedSurvey: surveyDetails })
  }
}

export const deleteSurveyAction = async (surveyId: string): Promise<void> => {
  await deleteSurvey(surveyId)
  await fetchSurveysAction()
}

export const updateSurveyAction = async (surveyId: string, body: UpdateSurveyBody): Promise<void> => {
  const updatedSurveyResponse = await updateSurvey(surveyId, body)
  if (updatedSurveyResponse != null) {
    useGlobalStore.setState((state) => ({
      surveys: state.surveys.map(survey =>
        survey.id === surveyId ? updatedSurveyResponse : survey
      ),
      currentDisplayedSurvey: state.currentDisplayedSurvey?.id === surveyId ? updatedSurveyResponse : state.currentDisplayedSurvey
    }))
    await fetchSurveysAction()
  }
}

export const submitSurveyAnswersAction = async (surveyId: string, body: AnswerSurveyBody): Promise<void> => {
  await submitSurveyAnswers(surveyId, body)
  await fetchSurveyResultsAction(surveyId)
}

export const fetchSurveyResultsAction = async (surveyId: string): Promise<void> => {
  const surveyResults = await fetchSurveyResults(surveyId)
  if (surveyResults != null) {
    useGlobalStore.setState({ currentSurveyResults: surveyResults })
  }
}
