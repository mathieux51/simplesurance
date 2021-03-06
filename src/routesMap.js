import axios from 'axios'
// import { redirect } from 'redux-first-router'
import { setQuestions, setStage } from './actions/questions'
import data from './data.json'

const getAsyncData = (time, val) =>
  new Promise(resolve => setTimeout(resolve.bind(null, val), time))

const getUserFullNameLength = user => (user.last_name + user.first_name).length
const getUser = users =>
  users.reduce((acc, cur) => {
    if (getUserFullNameLength(acc) < getUserFullNameLength(cur)) acc = cur
    return acc
  }, users[0])

export default {
  HOME: {
    path: '/:questionId?',
    thunk: async (dispatch, getState) => {
      const { data: users } = await axios('https://tinyfac.es/api/users')
      const user = getUser(users)
      console.log(user)

      const state = getState()
      if (state.location.kind === 'load') {
        const { questions } = await getAsyncData(500, data)
        dispatch(setQuestions(questions))
        return
      }
      const { questionId } = state.location.payload
      dispatch(setStage(questionId))
    }
  },
  REPLY_LIST: 'replyList'
}
