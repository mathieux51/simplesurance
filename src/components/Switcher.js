import React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'
import NotFound from './pages/NotFound'

const UniversalComponent = universal(({ page }) => import(`./pages/${page}`), {
  minDelay: 500,
  loading: () => <span>loading...</span>,
  error: () => <NotFound />
})

const Switcher = ({ page }) => <UniversalComponent page={page} />

const mapStateToProps = state => ({
  page: state.page
})

export default connect(mapStateToProps)(Switcher)
