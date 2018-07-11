import { SET_QUESTIONS, SET_ANSWER, SET_STAGE } from '../constants'

function updateObjectInArray(array, action) {
  return array.map((question, index) => {
    if (index !== action.index) {
      return question
    }
    return {
      ...question,
      reply: action.reply
    }
  })
}

const initialState = {
  stage: '',
  questions: []
}

export default (state = initialState, action = {}) => {
  const index = state.questions.findIndex(x => x.id === action.questionId)
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        stage: action.questions[0].id,
        questions: action.questions
      }
    case SET_STAGE:
      return {
        ...state,
        stage: action.stage
      }
    case SET_ANSWER:
      return {
        ...state,
        questions: updateObjectInArray(state.questions, {
          reply: action.reply,
          index
        })
      }
    default:
      return state
  }
}
