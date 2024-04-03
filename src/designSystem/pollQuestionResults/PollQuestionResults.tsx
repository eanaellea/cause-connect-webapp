import { FC } from 'react'

import { Progress } from 'antd'
import { PollQuestionResponse, QuestionAnswersCount } from '@/services/mainApi/queries/votes'

interface Props {
  questionAnswersCount: QuestionAnswersCount
  question: PollQuestionResponse
}

export const PollQuestionResults: FC<Props> = ({ questionAnswersCount, question }) => {
  const totalNbResponses = questionAnswersCount.optionCounts.reduce((acc, count) => acc + count.count, 0)

  return (
    <div>
      {questionAnswersCount.optionCounts.map((count) => {
        const option = question.options.find((option) => option.id === count.optionId)
        if (option === undefined) {
          return null
        }

        return (
          <div key={count.optionId}>
            <div>{option.content}</div>
            <Progress percent={count.count / totalNbResponses * 100} />
          </div>
        )
      })}
    </div>
  )
}
