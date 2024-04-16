import { StateCreator } from 'zustand'

import { GlobalStore, SurveysSlice } from '../types'

export const initialState: SurveysSlice = {
  surveys: [],
  currentDisplayedSurvey: null,
  currentSurveyResults: null
}

export const createSurveysSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
SurveysSlice
> = () => initialState
