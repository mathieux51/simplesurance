import { redirect } from 'redux-first-router'
import { setQuestions, setStage } from './actions/questions'
import data from './data.json'

const getAsyncData = (time, val) =>
  new Promise(resolve => setTimeout(resolve.bind(null, val), time))

export default {
  HOME: {
    path: '/:questionId?',
    thunk: async (dispatch, getState) => {
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
