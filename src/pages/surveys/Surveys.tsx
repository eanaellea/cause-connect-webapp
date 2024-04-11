import { Button, Input } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import styles from './Surveys.module.scss'
import { fetchCurrentSurveyResultsAction, fetchSurveysAction, setCurrentDisplayedSurveyAction } from '@/store/surveysSlice/actions'
import { CreateSurveyModal } from '@/components/surveys/createSurveyModal/CreateSurveyModal'
import { useGlobalStore } from '@/store/store'
import { SurveyCard } from '@/components/surveys/surveyCard/SurveyCard'
import { useParams } from 'react-router-dom'
import { EditSurveyModal } from '@/components/surveys/editSurveyModal/EditSurveyModal'
import { ViewSurveyModal } from '@/components/surveys/viewSurveyModal/ViewSurveyModal'
import { router } from '@/router'

const REFETCH_VOTES_INTERVAL = 10000
const REFETCH_SURVEY_RESULTS_INTERVAL = 5000

export const Surveys: FC = () => {
  // data
  const [searchValue, setSearchValue] = useState('')
  const surveys = useGlobalStore((state) => state.surveys).filter((survey) => survey.title.includes(searchValue))

  // modal states
  const [isCreateSurveyModalOpen, setIsCreateSurveyModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // handle surveyId param
  const surveyId = useParams<{ surveyId: string }>().surveyId
  const applyParamSurveyId = async (surveyId: string): Promise<void> => {
    await setCurrentDisplayedSurveyAction(surveyId)
    await router.navigate('/app/surveys')
    setIsViewModalOpen(true)
  }
  if (surveyId !== undefined) {
    void applyParamSurveyId(surveyId)
  }

  useEffect(() => {
    void fetchSurveysAction()

    const interval = setInterval(() => {
      void fetchSurveysAction()
    }, REFETCH_VOTES_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchCurrentSurveyResultsAction()
    }, REFETCH_SURVEY_RESULTS_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h1>Surveys</h1>
      <div className={styles.surveysHeader}>
        <Button type='primary' icon={<FileAddOutlined />} onClick={() => setIsCreateSurveyModalOpen(true)}>Ajouter un sondage</Button>
        <Input.Search value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Rechercher un sondage' />
      </div>
      <div className={styles.surveysList}>
        {surveys.map((survey) => (
          <SurveyCard
            survey={survey}
            key={survey.id}
            setIsEditModalOpen={setIsEditModalOpen}
            setIsViewModalOpen={setIsViewModalOpen}
          />
        ))}
      </div>
      <CreateSurveyModal open={isCreateSurveyModalOpen} onClose={() => setIsCreateSurveyModalOpen(false)} />
      <EditSurveyModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <ViewSurveyModal open={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />
    </div>
  )
}
