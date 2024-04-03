import { z } from 'zod'

export enum PollQuestionType {
  SINGLE_CHOICE = 'single_choice',
  MULTIPLE_CHOICE = 'mutliple_choice',
}

export interface NewPollQuestion {
  prompt: string
  type: PollQuestionType
  options: Array<{ content: string }>
}

export const PollQuestionTypeSchema = z.enum([PollQuestionType.SINGLE_CHOICE, PollQuestionType.MULTIPLE_CHOICE])

export const NewPollQuestionSchema = z.object({
  prompt: z.string(),
  type: PollQuestionTypeSchema,
  options: z.array(z.object({
    content: z.string()
  }))
})

export interface PollQuestionResponse {
  id: string
  prompt: string
  type: PollQuestionType
  options: Array<{ id: string, content: string }>
}
