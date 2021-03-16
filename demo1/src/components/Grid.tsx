import * as React from 'react'

interface GridProps {
  width?: number
  height?: number
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE'
}

export const Grid = (props: GridProps) => {
  return (
    <div>
      width:{props.width}
      height:{props.height}
    </div>
  )
}
