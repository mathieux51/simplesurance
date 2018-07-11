import React from 'react'
import { connect } from 'react-redux'

const ReplyList = props => (
  <main>
    <article className='bg-white'>
      <div className='ph4 ph5-m ph6-l'>
        <div className='pv5 f4 f2-ns measure center'>
          <h1 className='fw6 f1 fl w-100 black-70 mt0 mb3'>Claim Submission</h1>
          <ul className='list pl0 mt0 measure center'>
            {props.questions.map(question =>
                question.reply && (
                  <li
                    className='flex items-center lh-copy pa3 bb b--black-10'
                    key={question.id}
                  >
                    <span className='f6 db black-70 pl3 flex-auto'>
                      {question.text}
                    </span>
                    <span className='f6 link blue hover-dark-gray'>
                      {question.reply}
                    </span>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </article>
  </main>
)

const mapStateToProps = state => ({
  questions: state.questions.questions
})

export default connect(mapStateToProps)(ReplyList)
