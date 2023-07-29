import { Button, Container, PasswordInput, TextInput, Title } from '@mantine/core';
import { useLogin } from '../hooks/use-login.hook';

export function LoginPage () {
  const { isLoadingAuth, handleLogin, form } = useLogin()

  if (isLoadingAuth) return null

  return (
    <Container size="xs" pt={200}>
      <Title order={1} align='center' mb="md">Login</Title>
      <Title order={4} align='center' mb="md">Welcome to your time tracker app</Title>
      <form onSubmit={form.onSubmit(handleLogin)}>
        <TextInput {...form.getInputProps('email')} placeholder={'Your email'} mb={'md'} />
        <PasswordInput {...form.getInputProps('password')} placeholder={'Your password'} mb="md" />
        <Button type='submit'>Login</Button>
      </form>
    </Container>
  )
}