import { Dropdown } from '@/shared/components/dropdown.component'
import { FaTrash } from 'react-icons/fa'
import { GiSettingsKnobs } from 'react-icons/gi'
import { RiEdit2Fill } from 'react-icons/ri'

export function SettingsButton ({ color = 'white', onDelete, onEdit }) {
  function handleClick (e, cb = null) {
    e.stopPropagation()
    cb && cb()
  }

  const menuItems = [
    {
      label: 'Edit',
      icon: <RiEdit2Fill />,
      onClick: (e) => handleClick(e, onEdit)
    },
    {
      label: 'Delete',
      icon: <FaTrash />,
      color: 'red',
      onClick: (e) => handleClick(e, onDelete)
    }
  ]

  return (
    <Dropdown anchorText={<GiSettingsKnobs size={'20px'} color={color} />} anchorStyle={{ position: 'absolute', top: 5, right: 5 }} menuItems={menuItems} />
  )
}