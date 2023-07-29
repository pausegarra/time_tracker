import FlexCard from '@/shared/components/flex-card.component'
import React from 'react'
import { allIcons } from './all-icons.component'
import { SettingsButton } from './settings-button.component'

function TopicItem ({ topic, onTopicClick, selectedTopic, onDeleteTopic, onEdit }) {
  const isActive = selectedTopic?.topic.id === topic.id
  const color = !isActive ? topic.color : 'black'
  const background = isActive ? topic.color : 'transparent'

  return (
    <div onClick={() => onTopicClick(topic.id)}>
      <FlexCard background={background} borderColor={topic.color}>
        <SettingsButton onEdit={() => onEdit(topic)} onDelete={() => onDeleteTopic(topic.id)} color={color} />
        {React.createElement(allIcons[topic.icon], { size: '60px', color })}
        <span style={{ color }}>{topic.name}</span>
      </FlexCard>
    </div>
  )
}

export default TopicItem