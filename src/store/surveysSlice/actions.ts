import { AnswerSurveyBody, createSurvey, CreateSurveyBody, deleteSurvey, fetchSurveys, fetchSurveyDetails, fetchSurveyResults, submitSurveyAnswers, replaceSurvey } from '@/services/mainApi/queries/surveys'
import { useGlobalStore } from '../store'

export const setCurrentDisplayedSurveyAction = async (surveyId: string | null): Promise<void> => {
  if (surveyId === null) {
    useGlobalStore.setState({ currentDisplayedSurvey: null })
    return
  }

  const fullSurvey = await fetchSurveyDetails(surveyId)
  const results = await fetchSurveyResults(surveyId)
  useGlobalStore.setState({ currentDisplayedSurvey: fullSurvey, currentSurveyResults: results })
}

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

export const replaceCurrentSurveyAction = async (body: CreateSurveyBody): Promise<void> => {
  const currentSurveyId = useGlobalStore.getState().currentDisplayedSurvey?.id
  if (currentSurveyId == null) {
    return
  }
  const replacedSurveyResponse = await replaceSurvey(currentSurveyId, body)
  console.log('hippo', replacedSurveyResponse)
  if (replacedSurveyResponse != null) {
    useGlobalStore.setState((state) => ({
      surveys: state.surveys.map(survey =>
        survey.id === currentSurveyId ? replacedSurveyResponse : survey
      ),
      currentDisplayedSurvey: replacedSurveyResponse
    }))
    await fetchSurveysAction()
  }
}

export const submitSurveyAnswersAction = async (surveyId: string, body: AnswerSurveyBody): Promise<void> => {
  await submitSurveyAnswers(surveyId, body)
}

export const fetchCurrentSurveyResultsAction = async (): Promise<void> => {
  const currentSurveyId = useGlobalStore.getState().currentDisplayedSurvey?.id
  if (currentSurveyId == null) {
    return
  }

  const surveyResults = await fetchSurveyResults(currentSurveyId)
  if (surveyResults != null) {
    useGlobalStore.setState({ currentSurveyResults: surveyResults })
  }
}
