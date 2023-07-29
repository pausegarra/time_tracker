import React from 'react'
import { Button, Center, ColorInput, Drawer, Group, Loader, TextInput } from '@mantine/core'

const IconList = React.lazy(() => import('../components/icon-list.component'))

export function TopicsForm ({ opened, close, handleIconSelect, handleSubmit, form, handleSearch, search }) {

  return (
    <Drawer opened={opened} onClose={close} title="Add topic" size={"lg"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Topic name" {...form.getInputProps('name')} placeholder='Working' />
        <ColorInput label="Color" {...form.getInputProps('color')} placeholder='#00FF00' />
        <Group mt={20} grow>
          <label>Icon</label>
          <TextInput placeholder='Type here the icon name' width={100} onChange={handleSearch} />
        </Group>
        <React.Suspense fallback={<Center mt={10}><Loader /></Center>}>
          <IconList handleIconSelect={handleIconSelect} selected={form.values.icon} search={search} />
        </React.Suspense>
        <Button type="submit" mt={20}>Send</Button>
      </form>
    </Drawer>
  )
}
