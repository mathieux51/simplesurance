import { SET_QUESTIONS, SET_ANSWER, SET_STAGE } from '../constants'

export const setQuestions = questions => ({
  type: SET_QUESTIONS,
  questions
})

export const setAnswer = (questionId, reply) => ({
  type: SET_ANSWER,
  questionId,
  reply
})

export const setStage = stage => ({
  type: SET_STAGE,
  stage
})
