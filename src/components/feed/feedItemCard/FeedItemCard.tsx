import { FeedItemResponse } from '@/services/mainApi/queries/feed'
import { useGlobalStore } from '@/store/store'
import { Card } from 'antd'
import { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  feedItemId: string
}

export const FeedItemCard: FC<Props> = ({ feedItemId }) => {
  const feedItem = useGlobalStore((state) => state.feedItemsById[feedItemId])

  const linkDestination: string | null = useMemo(() => {
    switch (feedItem.type) {
      case 'event':
        return `/app/events/${feedItemId}`
      case 'meeting':
        return `/app/events/${feedItemId}`
      case 'user':
        return null
      case 'vote':
        return `/app/votes/${feedItemId}`
      case 'survey':
        return `/app/surveys/${feedItemId}`
      default:
        return '/app/feed'
    }
  }, [feedItem])

  const feedItemCardTitle = useMemo(() => {
    switch (feedItem.type) {
      case 'event':
        return 'Événement créé'
      case 'meeting':
        return 'Assemblée générale créée'
      case 'user':
        return 'Nouveau membre'
      case 'vote':
        return 'Vote publié'
      case 'survey':
        return 'Sondage publié'
      default:
        return 'Élément de feed inconnu'
    }
  }
  , [feedItem])

  return (
    <Card
      title={feedItemCardTitle}
      extra={
        linkDestination !== null
          ? <Link to={linkDestination}>View</Link>
          : null
      }
    >
      <FeedItemContent feedItem={feedItem} />
    </Card>
  )
}

const FeedItemContent: FC<{ feedItem: FeedItemResponse }> = ({ feedItem }) => {
  switch (feedItem.type) {
    case 'event':
      return <EventFeedItemContent feedItem={feedItem} />
    case 'meeting':
      return <MeetingFeedItemContent feedItem={feedItem} />
    case 'user':
      return <UserFeedItemContent feedItem={feedItem} />
    case 'vote':
      return <VoteFeedItemContent feedItem={feedItem} />
    case 'survey':
      return <SurveyFeedItemContent feedItem={feedItem} />
    default:
      return null
  }
}

const EventFeedItemContent: FC<{ feedItem: FeedItemResponse }> = ({ feedItem }) => {
  return (
    <div>
      <p>{feedItem.title}</p>
      <p>{feedItem.description}</p>
    </div>
  )
}

const MeetingFeedItemContent: FC<{ feedItem: FeedItemResponse }> = ({ feedItem }) => {
  return (
    <div>
      <p>{feedItem.title}</p>
      <p>{feedItem.description}</p>
    </div>
  )
}

const UserFeedItemContent: FC<{ feedItem: FeedItemResponse }> = ({ feedItem }) => {
  return (
    <div>
      <p>Son nom est {feedItem.title}</p>
      <p>Allez dire bonjour par email: {feedItem.description} !</p>
    </div>
  )
}

const VoteFeedItemContent: FC<{ feedItem: FeedItemResponse }> = ({ feedItem }) => {
  return (
    <div>
      <p>{feedItem.title}</p>
      <p>{feedItem.description}</p>
    </div>
  )
}

const SurveyFeedItemContent: FC<{ feedItem: FeedItemResponse }> = ({ feedItem }) => {
  return (
    <div>
      <p>{feedItem.title}</p>
      <p>{feedItem.description}</p>
    </div>
  )
}
