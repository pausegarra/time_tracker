import { useForm } from '@mantine/form'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { topicService as _topicService } from '../services/topics.service'
import { httpErrorNames as _httpErrorNames } from '@/shared/http-error-codes'
import { notificationsService as _notificationsService } from '@/notifications/services/notifications.service'
import { useFetch } from '@/shared/hooks/use-fetch.hook'
import React from 'react'

export function useTopics (notificationsService = _notificationsService, topicService = _topicService, httpErrorNames = _httpErrorNames) {
  const [search, setSearch] = useDebouncedState('', 500)
  const [opened, { open: openDrawer, close }] = useDisclosure()
  const { data: topics, isLoading: isLoadingTopics, refresh: refreshTopics } = useFetch(topicService, 'getMyTopics')
  const { data: activeTopic, refresh: refreshCurrent } = useFetch(topicService, 'getCurrentActive')
  const editingTopicRef = React.useRef(null)
  const form = useForm({
    name: '',
    color: '',
    icon: '',
  })

  function open () {
    editingTopicRef.current = null
    form.setFieldValue('name', '')
    form.setFieldValue('color', '')
    form.setFieldValue('icon', '')
    setSearch('')
    openDrawer()
  }

  function handleIconSelect (icon) {
    form.setFieldValue('icon', icon)
  }

  function handleSearch (e) {
    const { value } = e.currentTarget
    setSearch(value)
  }

  async function handleSubmit (values) {
    try {
      if (editingTopicRef.current === null) {
        await topicService.createTopic(values)
        notificationsService.success({ title: 'Topic added!', message: 'Your topic has been added!' })
      } else {
        await topicService.editTopic(editingTopicRef.current, values)
        notificationsService.success({ title: 'Topic updated!', message: 'Your topic has been updated!' })
      }
      close()
      form.reset()
      setSearch('')
      refreshTopics()
    } catch (err) {
      if (err.name === httpErrorNames.UnprocessableEntity)
        return notificationsService.showFieldErrors(err.error.message)

      notificationsService.unhandledError()
    }
  }

  async function handleDeleteTopic (topicId) {
    try {
      await topicService.deleteTopic(topicId)
      notificationsService.success({ title: 'Topic deleted', message: 'Your topic was deleted successfully' })
      refreshTopics()
    } catch (err) {
      if (err.name === httpErrorNames.NotFound)
        return notificationsService.error({ title: 'An error while deleting your topic has ocurred!', message: 'The topic was not found' })

      notificationsService.unhandledError()
    }
  }

  async function activateTopic (topicId) {
    if (activeTopic?.topic.id === topicId) return

    try {
      await topicService.activateTopic(topicId)
      refreshCurrent()
    } catch (err) {
      console.log(err)
      if (err.name === httpErrorNames.NotFound)
        return notificationsService.error({ title: 'An error while activating your topic has ocurred!', message: 'Your topic was not found' })

      notificationsService.unhandledError()
    }
  }

  function handleEditTopic (topic) {
    const { id, name, color, icon } = topic
    form.setFieldValue('name', name)
    form.setFieldValue('color', color)
    form.setFieldValue('icon', icon)
    setSearch(icon)
    editingTopicRef.current = id
    openDrawer()
  }

  return {
    search,
    handleSearch,
    handleIconSelect,
    form,
    handleSubmit,
    opened,
    open,
    close,
    isLoadingTopics,
    topics,
    activateTopic,
    activeTopic,
    handleDeleteTopic,
    handleEditTopic
  }
}