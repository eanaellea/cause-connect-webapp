import { Vote, VoteStatus } from '@/services/mainApi/queries/votes'
import { FC } from 'react'
import styles from './VoteInfo.module.scss'
import { Tag, TagProps } from 'antd'

interface Props {
  vote: Vote
}

const colorPerStatus: Record<VoteStatus, TagProps['color']> = {
  [VoteStatus.NOT_STARTED]: 'blue',
  [VoteStatus.OPEN]: 'orange',
  [VoteStatus.DONE]: 'default'
}

export const VoteInfo: FC<Props> = ({ vote }) => {
  return (
    <div className={styles.voteInfo}>
      <p>
        {vote.description}
      </p>
      <p>
        <span className={styles.infoProp}>Status:</span>
        <Tag color={colorPerStatus[vote.status]}>{vote.status}</Tag>
      </p>
      <p>
        <span className={styles.infoProp}>Visibility:</span>
        {vote.visibility}
      </p>
      <p>
        <span className={styles.infoProp}>Pourcentage minimum de votes:</span>
        {vote.minPercentAnswers}%
      </p>
      <p>
        <span className={styles.infoProp}>Critère d'acceptance:</span>
        {vote.acceptanceCriteria}
      </p>
    </div>
  )
}
