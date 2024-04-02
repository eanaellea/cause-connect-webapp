import { useGlobalStore } from '@/store/store'
import { closeCurrentVoteAction, openCurrentVoteAction, updateCurrentDisplayedVoteAction } from '@/store/votesSlice/actions'
import { FC, useEffect } from 'react'
import { VoteStatus } from '@/services/mainApi/queries/votes'
import { ViewNotStartedVoteModal } from '../viewNotStartedVoteModal/ViewNotStartedVoteModal'
import { ViewOpenVoteModal } from '../viewOpenVoteModal/ViewOpenVoteModal'
import { ViewDoneVoteModal } from '../viewDoneVoteModal/ViewDoneVoteModal'

interface Props {
  voteId: string
  open: boolean
  onClose: () => void
}

export const ViewVoteModal: FC<Props> = ({ voteId, open, onClose }) => {
  const currentDisplayedVote = useGlobalStore((state) => state.currentDisplayedVote)

  useEffect(() => {
    void updateCurrentDisplayedVoteAction(voteId)
  }, [])

  if (currentDisplayedVote == null) {
    return null
  }

  switch (currentDisplayedVote.status) {
    case VoteStatus.NOT_STARTED:
      return (
        <ViewNotStartedVoteModal open={open} onClose={onClose} openVote={() => { void openCurrentVoteAction() }} />
      )
    case VoteStatus.OPEN:
      return (
        <ViewOpenVoteModal open={open} onClose={onClose} closeVote={() => { void closeCurrentVoteAction() }} />
      )
    case VoteStatus.DONE:
      return (
        <ViewDoneVoteModal open={open} onClose={onClose} />
      )
    default:
      return null
  }
}
