import { FC } from 'react'
import styles from './SurveyInfo.module.scss'
import { Survey, SurveyVisibility } from '@/services/mainApi/queries/surveys'
import { TagProps, Tag } from 'antd'

interface Props {
  survey: Survey
}

const colorPerVisibility: Record<SurveyVisibility, TagProps['color']> = {
  [SurveyVisibility.PUBLIC]: 'green',
  [SurveyVisibility.PRIVATE]: 'red'
}

export const SurveyInfo: FC<Props> = ({ survey }) => {
  return (
    <div className={styles.info}>
      <p>
        {survey.description}
      </p>
      <p>
        <span className={styles.infoProp}>Visibility:</span>
        <Tag
          color={colorPerVisibility[survey.visibility]}
        >
          {survey.visibility}
        </Tag>
      </p>
    </div>
  )
}
