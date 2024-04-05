import { Button, Input } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import styles from './Surveys.module.scss'
import { fetchCurrentSurveyResultsAction, fetchSurveysAction } from '@/store/surveysSlice/actions'
import { CreateSurveyModal } from '@/components/surveys/createSurveyModal/CreateSurveyModal'
import { useGlobalStore } from '@/store/store'
import { SurveyCard } from '@/components/surveys/surveyCard/SurveyCard'

export const Surveys: FC = () => {
  const REFETCH_VOTES_INTERVAL = 10000
  const REFETCH_SURVEY_RESULTS_INTERVAL = 5000
  const [searchValue, setSearchValue] = useState('')
  const surveys = useGlobalStore((state) => state.surveys).filter((survey) => survey.title.includes(searchValue))
  const [isCreateSurveyModalOpen, setIsCreateSurveyModalOpen] = useState(false)

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
          <SurveyCard survey={survey} key={survey.id} />
        ))}
      </div>
      <CreateSurveyModal open={isCreateSurveyModalOpen} onClose={() => setIsCreateSurveyModalOpen(false)} />
    </div>
  )
}
