import { Button, Center, Container, Divider, Group, Loader, Stack, Text, Title } from '@mantine/core'
import { TopicsForm } from '../components/topics-form.component'
import { useTopics } from '../hooks/use-topics.hook'
import { ListTopics } from '../components/topics-list.component'
import { allIcons } from '../components/all-icons.component'
import React from 'react'
import ElapsedTime from '../components/elapsed-time.component'

function TopicsPage () {
  const { opened, close, open, topics, isLoadingTopics, activateTopic, activeTopic, handleDeleteTopic, handleEditTopic, ...topicFormProps } = useTopics()

  return (
    <>
      <Container mt={20}>
        <Stack align='center'>
          {activeTopic !== null ? <>
            <Title order={2}>Current active topic</Title>
            {React.createElement(allIcons[activeTopic?.topic.icon], { size: 80 })}
            <Text fw={700} fz={'xl'}>{activeTopic?.topic.name}</Text>
            <Text fw={700}>Elapsed time: <ElapsedTime startDate={new Date(activeTopic.startedAt)} /></Text>
          </> : <Text>No active topic</Text>}
        </Stack>
        <Divider my={20} />
        <Group position='apart'>
          <Title order={2}>Your topics</Title>
          <Button onClick={open}>Add new topic</Button>
        </Group>
        {isLoadingTopics ? <Center><Loader /></Center> : <>
          <ListTopics onEdit={handleEditTopic} activateTopic={activateTopic} activeTopic={activeTopic} topics={topics} onDeleteTopic={handleDeleteTopic} />
        </>}
      </Container>
      <TopicsForm opened={opened} close={close} {...topicFormProps} />
    </>
  )
}

export default TopicsPage