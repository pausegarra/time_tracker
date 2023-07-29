import { Container, Stack, Text, Title } from '@mantine/core';


function ErrorFallback ({ message }) {
  return (
    <Container>
      <Stack align='center' mt={20}>
        <Title order={2}>Something went wrong 😭</Title>
        <Text>{message}</Text>
      </Stack>
    </Container>
  );
}

export default ErrorFallback;
