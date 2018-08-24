import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { setAnswer } from '../../../actions/questions'
import Input from '../../atoms/Input'
import styles from './styles.module.css'

const dataTypeToInputType = {
  string: 'text',
  date: 'date',
  number: 'number',
  boolean: 'checkbox',
  email: 'email'
}

const getIsDisabled = ({ type, reply }) => {
  if (type === 'boolean') return true
  if (type === 'email') {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
    return !pattern.test(String(reply).toLowerCase())
  }
  return !reply.length
}

const Home = props => {
  const stage = props.stage || props.questions[0].id
  const question = props.questions.find(x => x.id === stage)
  const isDisabled = getIsDisabled(question)
  const type = dataTypeToInputType[question.type]

  const handleOnChange = val => props.setAnswer(question.id, String(val))
  const handleOnClick = evt => {
    evt.preventDefault()
    if (question.type === 'boolean' && question.reply === '') {
      props.setAnswer(question.id, String(false))
    }
    if (!isDisabled) {
      props.next(question.next)
    }
  }
  console.log(isDisabled)
  return (
    <main>
      <article className='bg-white vh-100'>
        <div className='ph4 ph5-m ph6-l'>
          <div className='pv5 f4 f2-ns measure center'>
            <h1 className='fw6 f1 fl w-100 black-70 mt0 mb3'>
              {question.text}
            </h1>
            <Input
              type={type}
              value={question.reply}
              handleOnChange={handleOnChange}
            />
            <a
              role='link'
              tabIndex='0'
              className={`f6 link dim ba ph3 pv2 mb2 dib black pointer ${isDisabled &&
                cx(styles.isDisabled, styles.notAllowed)}`}
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
