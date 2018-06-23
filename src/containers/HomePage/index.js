
import React from 'react'
import PropTypes from 'prop-types'

const navigate = (fn, path) => event => fn(path)
const HomePage = ({ history }) => (
  <div style={styles.container}>
    <h2>TEX Hackathon</h2>
    <h3>Open up the bank</h3>

    <div style={styles.actions}>
      <button onClick={navigate(history.push, '/settings')}>Update settings</button>
    </div>
  </div>
)

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '2rem'
  },
  actions: {
    marginTop: 20
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
}

export default HomePage
