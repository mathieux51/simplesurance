import { NOT_FOUND } from 'redux-first-router'

export default (state = 'HOME', action = {}) => components[action.type] || state

const components = {
  HOME: 'Home',
  REPLY_LIST: 'ReplyList',
  [NOT_FOUND]: 'NotFound'
}
