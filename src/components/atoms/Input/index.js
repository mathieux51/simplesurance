import React from 'react'
import Toggle from 'react-toggle'
import './styles.css'

export default props =>
  props.type !== 'checkbox' ? (
    <input
      required
      className='input-reset ba b--black-20 pa2 mb2 db w-100'
      type={props.type}
      value={props.value}
      onChange={evt => props.handleOnChange(evt.target.value)}
    />
  ) : (
    <Toggle
      className='ba pa2 mb2 db w-100'
      icons={false}
      defaultChecked={!!props.value}
      onChange={evt => props.handleOnChange(evt.target.checked)}
    />
  )
