import { redirect } from 'redux-first-router'
import { setQuestions } from './actions/questions'
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
      const { stage, questions } = state.questions
      const index =
        questions.length === 0
          ? 0
          : questions.findIndex(x => x.id === questionId)

      if (index > stage) {
        return dispatch(redirect({
          type: 'HOME',
          payload: { questionId: questions[stage].questionId }
        }))
      }
    }
  },
  REPLY_LIST: 'replyList'
}
