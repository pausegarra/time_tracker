import { SimpleGrid } from '@mantine/core'
import TopicItem from './topic-item.component'

const breakpoints = [
  { maxWidth: '62rem', cols: 2 },
  { maxWidth: '22rem', cols: 1 }
]

export function ListTopics ({ topics, activateTopic, activeTopic, onDeleteTopic, onEdit }) {
  return (
    <>
      <SimpleGrid breakpoints={breakpoints} cols={4} mt={20}>
        {topics.map(topic => <TopicItem key={topic.id} topic={topic} onTopicClick={activateTopic} onEdit={onEdit} selectedTopic={activeTopic} onDeleteTopic={onDeleteTopic} />)}
      </SimpleGrid>
    </>
  )
}
