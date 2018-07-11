import React from 'react'
import { connect } from 'react-redux'
import { setAnswer } from '../../../actions/questions'
import Input from '../../atoms/Input'
import styles from './styles.module.css'

const dataTypeToInputType = {
  string: 'text',
  date: 'date',
  number: 'number',
  boolean: 'checkbox'
}

const Home = props => {
  const stage = props.stage || props.questions[0].id
  const question = props.questions.find(x => x.id === stage)

  const isDisabled =
    question.type === 'boolean' ? false : !question.reply.length
  const handleOnChange = val => props.setAnswer(question.id, String(val))
  const handleOnClick = evt => {
    evt.preventDefault()
    if (question.type === 'boolean' && question.reply === '') {
      console.log('Hi')
      props.setAnswer(question.id, String(false))
    }
    if (!isDisabled) {
      console.log('Hello')
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
