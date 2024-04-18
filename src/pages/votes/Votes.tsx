import { Button, Input } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import styles from './Votes.module.scss'
import { VoteCard } from '@/components/votes/voteCard/VoteCard'
import { useGlobalStore } from '@/store/store'
import { CreateVoteModal } from '@/components/votes/createVoteModal/CreateVoteModal'
import { fetchCurrentBallotResultsAction, fetchVotesAction, fetchWinningOptionAction, updateCurrentDisplayedVoteAction } from '@/store/votesSlice/actions'
import { useParams } from 'react-router-dom'
import { router } from '@/router'
import { EditVoteModal } from '@/components/votes/editVoteModal/EditVoteModal'
import { ViewVoteModal } from '@/components/votes/viewVoteModal/ViewVoteModal'
import { UserRole } from '@/services/mainApi/queries/auth'

const REFETCH_VOTES_INTERVAL = 10000
const REFETCH_BALLOT_RESULTS_INTERVAL = 5000

export const Votes: FC = () => {
  // data
  const [searchValue, setSearchValue] = useState('')
  const currentVote = useGlobalStore((state) => state.currentDisplayedVote)
  const votes = useGlobalStore((state) => state.publicVotes).filter((vote) => vote.title.includes(searchValue))
  const userRole = useGlobalStore((state) => state.user?.role)
  if (!userRole) return null

  // modal states
  const [isCreateVoteModalOpen, setIsCreateVoteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // handle voteId param
  const voteId = useParams<{ voteId: string }>().voteId
  const applyParamVoteId = async (voteId: string): Promise<void> => {
    await updateCurrentDisplayedVoteAction(voteId)
    await router.navigate('/app/votes')
    setIsViewModalOpen(true)
  }
  if (voteId !== undefined) {
    void applyParamVoteId(voteId)
  }

  useEffect(() => {
    void fetchVotesAction()

    const interval = setInterval(() => {
      void fetchVotesAction()
    }, REFETCH_VOTES_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchCurrentBallotResultsAction()
    }, REFETCH_BALLOT_RESULTS_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    void fetchWinningOptionAction()
    void fetchCurrentBallotResultsAction()
  }, [currentVote?.id, currentVote?.status])

  return (
    <div>
      <h1>Votes</h1>
      <div className={styles.votesHeader}>
        {userRole === UserRole.ADMIN && (
          <Button type='primary' icon={<FileAddOutlined />} onClick={() => setIsCreateVoteModalOpen(true)}>Ajouter un vote</Button>
        )}
        <Input.Search value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Rechercher un vote' />
      </div>
      <div className={styles.votesList}>
        {votes.map((vote) => (
          <VoteCard
            vote={vote}
            key={vote.id}
            setIsEditModalOpen={setIsEditModalOpen}
            setIsViewModalOpen={setIsViewModalOpen}
          />
        ))}
      </div>
      <CreateVoteModal open={isCreateVoteModalOpen} onClose={() => setIsCreateVoteModalOpen(false)} />
      {(currentVote != null) && (
        <>
          <EditVoteModal vote={currentVote} open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
          <ViewVoteModal voteId={currentVote.id} open={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />
        </>
      )}
    </div>
  )
}
