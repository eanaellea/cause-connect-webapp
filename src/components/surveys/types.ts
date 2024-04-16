import { SurveyVisibility } from '@/services/mainApi/queries/surveys'
import { NewPollQuestionSchema } from '@/services/mainApi/types'
import { z } from 'zod'

export const UpdateSurveyBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  visibility: z.enum([SurveyVisibility.PUBLIC, SurveyVisibility.PRIVATE]).optional(),
  questions: z.array(NewPollQuestionSchema).optional()
})

export const CreateSurveyBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  visibility: z.enum([SurveyVisibility.PUBLIC, SurveyVisibility.PRIVATE]),
  questions: z.array(NewPollQuestionSchema)
})
