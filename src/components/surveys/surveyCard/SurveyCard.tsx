import { Card } from 'antd'
import { FC } from 'react'
import styles from './SurveyCard.module.scss'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { SurveyInfo } from '../surveyInfo/SurveyInfo'
import { useGlobalStore } from '@/store/store'
import { UserRole } from '@/services/mainApi/queries/auth'
import { Survey } from '@/services/mainApi/queries/surveys'
import { setCurrentDisplayedSurveyAction } from '@/store/surveysSlice/actions'

interface Props {
  survey: Survey
  setIsEditModalOpen: (isOpen: boolean) => void
  setIsViewModalOpen: (isOpen: boolean) => void
}

export const SurveyCard: FC<Props> = ({ survey, setIsEditModalOpen, setIsViewModalOpen }) => {
  const userRole = useGlobalStore((state) => state.user?.role)

  const handleEditClick = async (): Promise<void> => {
    await setCurrentDisplayedSurveyAction(survey.id)
    setIsEditModalOpen(true)
  }

  const handleViewClick = async (): Promise<void> => {
    await setCurrentDisplayedSurveyAction(survey.id)
    setIsViewModalOpen(true)
  }

  const actions = [
    userRole === UserRole.ADMIN
      ? <EditOutlined key='edit' onClick={() => { void handleEditClick() }} />
      : undefined,
    userRole === UserRole.ADMIN
      ? <EyeOutlined key='delete' onClick={() => { void handleViewClick() }} />
      : undefined
  ]

  return (
    <>
      <Card
        className={styles.card}
        title={survey.title}
        actions={actions}
      >
        <SurveyInfo survey={survey} />
      </Card>
    </>
  )
}
