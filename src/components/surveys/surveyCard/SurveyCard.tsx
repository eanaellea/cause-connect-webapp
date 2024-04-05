import { Card } from 'antd'
import { FC, useState } from 'react'
import styles from './SurveyCard.module.scss'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { EditSurveyModal } from '../editSurveyModal/EditSurveyModal'
import { ViewSurveyModal } from '../viewSurveyModal/ViewSurveyModal'
import { SurveyInfo } from '../surveyInfo/SurveyInfo'
import { useGlobalStore } from '@/store/store'
import { UserRole } from '@/services/mainApi/queries/auth'
import { Survey } from '@/services/mainApi/queries/surveys'
import { setCurrentDisplayedSurveyAction } from '@/store/surveysSlice/actions'

interface Props {
  survey: Survey
}

export const SurveyCard: FC<Props> = ({ survey }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const userRole = useGlobalStore((state) => state.user?.role)

  const handleEditClick = async (): Promise<void> => {
    void setCurrentDisplayedSurveyAction(survey.id)
    setIsEditModalOpen(true)
  }

  const handleViewClick = async (): Promise<void> => {
    void setCurrentDisplayedSurveyAction(survey.id)
    setIsViewModalOpen(true)
  }

  const handleClose = (): void => {
    void setCurrentDisplayedSurveyAction(null)
    setIsEditModalOpen(false)
    setIsViewModalOpen(false)
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
        className={styles.voteCard}
        title={survey.title}
        actions={actions}
      >
        <SurveyInfo survey={survey} />
      </Card>
      <EditSurveyModal open={isEditModalOpen} onClose={handleClose} />
      <ViewSurveyModal open={isViewModalOpen} onClose={handleClose} />
    </>
  )
}
