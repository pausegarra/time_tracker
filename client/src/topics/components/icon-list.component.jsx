import React from 'react'
import { allIcons } from './all-icons.component'
import { Grid } from '@mantine/core'
import FlexCard from '@/shared/components/flex-card.component'

export default function IconList ({ handleIconSelect, selected, search = '' }) {
  const regexString = search.trim() !== '' ? `(.*)${search}(.*)` : '^$'
  const regex = new RegExp(regexString, 'i')
  const filteredIcons = Object.keys(allIcons).filter(icon => icon.match(regex))

  return (
    <Grid mt={10}>
      {filteredIcons.map((icon, index) => {
        const isThisIconSelected = selected === icon

        return (
          <Grid.Col
            span={4}
            key={index}
            onClick={() => handleIconSelect(icon)}
          >
            <FlexCard background={isThisIconSelected ? '#c1c2c5' : 'transparent'}>
              {React.createElement(allIcons[icon], { size: '30px', color: isThisIconSelected ? 'black' : '#c1c2c5' })}
              <span style={{ color: isThisIconSelected ? 'black' : '#c1c2c5' }}>{icon}</span>
            </FlexCard>
          </Grid.Col>
        )
      })}
    </Grid>
  )
}