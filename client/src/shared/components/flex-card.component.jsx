import { Flex } from '@mantine/core'

export function FlexCard ({ children, background = 'transparent', borderColor = '#c1c2c5' }) {
  const styles = {
    border: `1px solid ${borderColor}`,
    padding: 10,
    borderRadius: 10,
    cursor: 'pointer',
    background,
    transition: '.2s ease',
    position: 'relative'
  }

  return (
    <Flex direction={"column"} align={"center"} justify={"center"} style={styles}>
      {children}
    </Flex>
  )
}

export default FlexCard