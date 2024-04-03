import { FC } from 'react'
import { Progress, Tooltip } from 'antd'
import { QuestionAnswersCount } from '@/services/mainApi/queries/votes'
import styles from './PollQuestionResults.module.scss'
import { PollQuestionResponse } from '@/services/mainApi/types'

interface Props {
  questionAnswersCount: QuestionAnswersCount
  question: PollQuestionResponse
  winningOptionId: string | null
  isWinningOptionValid: boolean
}

export const PollQuestionResults: FC<Props> = ({ questionAnswersCount, question, winningOptionId, isWinningOptionValid }) => {
  const totalNbResponses = questionAnswersCount.optionCounts.reduce((acc, count) => acc + count.count, 0)

  const winningOptionTooltipText = isWinningOptionValid ? 'Option gagnante' : 'Option gagnante invalide (pas assez de votes, ou critères de validation non respectés)'
  const winningOptionCount = questionAnswersCount.optionCounts.find((count) => count.optionId === winningOptionId)

  return (
    <>
      <div>
        {questionAnswersCount.optionCounts.map((count) => {
          const option = question.options.find((option) => option.id === count.optionId)
          if (option === undefined) {
            return null
          }

          return (
            <div key={count.optionId}>
              <div>{option.content} ({count.count} votes)</div>
              {winningOptionCount?.count === count.count
                ? (
                  <Tooltip mouseEnterDelay={0} title={winningOptionTooltipText}>
                    <Progress status={isWinningOptionValid ? 'success' : 'exception'} percent={Math.round(count.count / totalNbResponses * 100)} className={styles.answerResult} />
                  </Tooltip>
                  )
                : (
                  <Progress success={{ percent: 0 }} percent={Math.round(count.count / totalNbResponses * 100)} className={styles.answerResult} />
                  )}
            </div>
          )
        })}
      </div>
    </>
  )
}
