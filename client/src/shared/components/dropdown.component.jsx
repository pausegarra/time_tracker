import { Anchor, Menu } from '@mantine/core';
import React from 'react';

export function Dropdown ({ menuItems = [], anchorText, anchorStyle = {} }) {
  return <Menu shadow='md' width={100} transitionProps={{ transition: 'skew-up', duration: 200 }}>
    <Menu.Target>
      <Anchor onClick={e => e.stopPropagation()} color='white' underline={false} style={anchorStyle}>{anchorText}</Anchor>
    </Menu.Target>

    <Menu.Dropdown>
      {menuItems.map((item, index) => (
        <Menu.Item icon={item.icon} color={item.color} key={index} onClick={item.onClick}>{item.label}</Menu.Item>
      ))}
    </Menu.Dropdown>
  </Menu>
}