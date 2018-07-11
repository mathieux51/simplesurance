import React from 'react'
import { connect } from 'react-redux'
import { setAnswer, setStage } from '../../../actions/questions'
import Input from '../../atoms/Input'
import styles from './styles.module.css'

const dataTypeToInputType = {
  string: 'text',
  date: 'date',
  number: 'number',
  boolean: 'checkbox'
}

const Home = props => {
  const question = props.questions[props.stage] || { reply: [] }

  const isDisabled =
    question.type === 'boolean' ? false : !question.reply.length
  const handleOnChange = val => props.setAnswer(question.id, val)
  const handleOnClick = evt => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!isDisabled) {
      props.setStage(props.stage + 1)
      props.next(question.next)
    }
  }
  return (
    <main>
      <article className='bg-white vh-100'>
        <div className='ph4 ph5-m ph6-l'>
          <div className='pv5 f4 f2-ns measure center'>
            <h1 className='fw6 f1 fl w-100 black-70 mt0 mb3'>
              {question.text}
            </h1>
            <Input
              type={dataTypeToInputType[question.type]}
              value={question.reply}
              handleOnChange={handleOnChange}
            />
            <a
              role='link'
              tabIndex='0'
              className={`f6 link dim ba ph3 pv2 mb2 dib black ${isDisabled &&
                styles.isDisabled}`}
              onClick={handleOnClick}
            >
              Next
            </a>
          </div>
        </div>
      </article>
    </main>
  )
}

const mapStateToProps = state => ({
  questions: state.questions.questions,
  stage: state.questions.stage
})

const mapDispatchToProps = dispatch => ({
  setAnswer: (...args) => dispatch(setAnswer(...args)),
  setStage: stage => dispatch(setStage(stage)),
  next: questionId => {
    const action = questionId
      ? {
        type: 'HOME',
        payload: {
          questionId
        }
      }
      : {
        type: 'REPLY_LIST'
      }
    dispatch(action)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
