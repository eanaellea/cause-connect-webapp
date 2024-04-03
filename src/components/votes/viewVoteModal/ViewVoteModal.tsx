import { useGlobalStore } from '@/store/store'
import { FC, useEffect } from 'react'
import { Modal, Button, QRCode } from 'antd'
import { VoteInfo } from '../voteInfo/VoteInfo'
import { closeCurrentVoteAction, fetchCurrentBallotResultsAction, fetchWinningOptionAction, openCurrentVoteAction, updateCurrentDisplayedVoteAction } from '@/store/votesSlice/actions'
import { VoteStatus } from '@/services/mainApi/queries/votes'
import { PollQuestionResults } from '@/designSystem/pollQuestionResults/PollQuestionResults'
import styles from './ViewVoteModal.module.scss'

interface Props {
  voteId: string
  open: boolean
  onClose: () => void
}

export const ViewVoteModal: FC<Props> = ({ voteId, open, onClose }) => {
  const currentDisplayedVote = useGlobalStore((state) => state.currentDisplayedVote)
  const currentDisplayedVoteAnswers = useGlobalStore((state) => state.currentVoteAnswers)
  const winningOption = useGlobalStore((state) => state.currentVoteWinningOption)
  const isCurrentVoteWinningOptionValid = useGlobalStore((state) => state.isCurrentVoteWinningOptionValid)

  if (currentDisplayedVote === null) {
    return null
  }

  const isNotStarted = currentDisplayedVote.status === VoteStatus.NOT_STARTED
  const isOpen = currentDisplayedVote.status === VoteStatus.OPEN
  const isDone = currentDisplayedVote.status === VoteStatus.DONE

  useEffect(() => {
    void updateCurrentDisplayedVoteAction(voteId)
    if (!isNotStarted) {
      void fetchCurrentBallotResultsAction()
    }
    if (isDone) {
      void fetchWinningOptionAction()
    }
  }, [voteId])

  return (
    <Modal
      title={currentDisplayedVote.title}
      open={open}
      onCancel={onClose}
      onOk={onClose}
      footer={[
        <Button key='back' onClick={onClose}>Annuler</Button>,
        isNotStarted && (
          <Button key='start' type='primary' onClick={() => { void openCurrentVoteAction() }}>
            Commencer le vote
          </Button>
        ),
        isOpen && (
          <Button key='close' danger type='primary' onClick={() => { void closeCurrentVoteAction() }}>
            Fermer le vote
          </Button>
        )
      ].filter(Boolean)} // remove null / false from the array
    >
      <VoteInfo vote={currentDisplayedVote} />
      {isOpen && (
        <div className={styles.qrCodeContainer}>
          <QRCode value={currentDisplayedVote.id} />
        </div>
      )}
      {!isNotStarted && currentDisplayedVoteAnswers !== null && (
        <PollQuestionResults
          question={currentDisplayedVote.question}
          questionAnswersCount={currentDisplayedVoteAnswers}
          winningOptionId={isDone ? winningOption : null}
          isWinningOptionValid={isCurrentVoteWinningOptionValid ?? false}
        />
      )}
    </Modal>
  )
}
