import { useGlobalStore } from '@/store/store'
import { FC } from 'react'
import { Divider, Modal, QRCode } from 'antd'
import { SurveyInfo } from '../surveyInfo/SurveyInfo'
import { PollQuestionResults } from '@/designSystem/pollQuestionResults/PollQuestionResults'
import styles from './ViewSurveyModal.module.scss'

interface Props {
  open: boolean
  onClose: () => void
}

export const ViewSurveyModal: FC<Props> = ({ open, onClose }) => {
  const currentDisplayedSurvey = useGlobalStore((state) => state.currentDisplayedSurvey)
  const results = useGlobalStore((state) => state.currentSurveyResults)

  if (currentDisplayedSurvey === null) {
    return null
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={`Viewing survey ${currentDisplayedSurvey.title}`}
    >
      <SurveyInfo survey={currentDisplayedSurvey} />
      <div className={styles.qrCodeContainer}>
        <QRCode value={`survey:${currentDisplayedSurvey.id}`} />
      </div>
      <Divider type='horizontal' />
      {currentDisplayedSurvey.questions?.map((question) => {
        const currentQuestionResults = results?.find((result) => result.questionId === question.id)
        if (currentQuestionResults === undefined) {
          return null
        }

        return (
          <div key={question.id} className={styles.questionsSection}>
            <h3>{question.prompt}</h3>
            <PollQuestionResults
              question={question}
              questionAnswersCount={currentQuestionResults}
              winningOptionId={null}
              isWinningOptionValid={false}
            />
          </div>
        )
      })}
    </Modal>
  )
}
