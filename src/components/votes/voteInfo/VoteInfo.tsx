import { Vote } from '@/services/mainApi/queries/votes'
import { FC } from 'react'
import styles from './VoteInfo.module.scss'
import { Tag } from 'antd'

interface Props {
  vote: Vote
}

export const VoteInfo: FC<Props> = ({ vote }) => {
  return (
    <div className={styles.userInfo}>
      <div>
        <h2>
          {vote.title}
        </h2>
        <p>
          {vote.description}
        </p>
      </div>
      <p>
        <span className={styles.infoProp}>Status:</span>
        <Tag color='blue'>{vote.status}</Tag>
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
