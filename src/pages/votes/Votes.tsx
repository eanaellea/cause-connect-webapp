import { Button, Input } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import styles from './Votes.module.scss'
import { VoteCard } from '@/components/votes/voteCard/VoteCard'
import { useGlobalStore } from '@/store/store'
import { CreateVoteModal } from '@/components/votes/createVoteModal/CreateVoteModal'
import { fetchVotesAction } from '@/store/votesSlice/actions'

export const Votes: FC = () => {
  const REFETCH_VOTES_INTERVAL = 10000
  const [searchValue, setSearchValue] = useState('')
  const votes = useGlobalStore((state) => state.publicVotes).filter((vote) => vote.title.includes(searchValue))
  const [isCreateVoteModalOpen, setIsCreateVoteModalOpen] = useState(false)

  useEffect(() => {
    void fetchVotesAction()

    const interval = setInterval(() => {
      void fetchVotesAction()
    }, REFETCH_VOTES_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h1>Votes</h1>
      <div className={styles.votesHeader}>
        <Button type='primary' icon={<FileAddOutlined />} onClick={() => setIsCreateVoteModalOpen(true)}>Ajouter un vote</Button>
        <Input.Search value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Rechercher un vote' />
      </div>
      <div className={styles.votesList}>
        {votes.map((vote) => (
          <VoteCard vote={vote} key={vote.id} />
        ))}
      </div>
      <CreateVoteModal open={isCreateVoteModalOpen} onClose={() => setIsCreateVoteModalOpen(false)} />
    </div>
  )
}
