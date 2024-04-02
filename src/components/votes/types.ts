import { PollQuestionType, VoteAcceptanceCriteria, VoteVisibility } from '@/services/mainApi/queries/votes'
import { z } from 'zod'

export const PollQuestionTypeSchema = z.enum([PollQuestionType.SINGLE_CHOICE, PollQuestionType.MULTIPLE_CHOICE])

export const NewPollQuestionSchema = z.object({
  prompt: z.string(),
  type: PollQuestionTypeSchema,
  options: z.array(z.object({
    content: z.string()
  }))
})

export const UpdateVoteBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  visibility: z.enum([VoteVisibility.PUBLIC, VoteVisibility.PRIVATE]).optional(),
  minPercentAnswers: z.number().min(0).max(100).optional(),
  acceptanceCriteria: z.enum([VoteAcceptanceCriteria.MAJORITY, VoteAcceptanceCriteria.TWO_THIRDS, VoteAcceptanceCriteria.UNANIMITY]).optional(),
  question: NewPollQuestionSchema
})

export const CreateVoteBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  visibility: z.enum([VoteVisibility.PUBLIC, VoteVisibility.PRIVATE]),
  minPercentAnswers: z.number().min(0).max(100),
  acceptanceCriteria: z.enum([VoteAcceptanceCriteria.MAJORITY, VoteAcceptanceCriteria.TWO_THIRDS, VoteAcceptanceCriteria.UNANIMITY]),
  question: NewPollQuestionSchema
})
