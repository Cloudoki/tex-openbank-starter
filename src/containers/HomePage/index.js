
import React from 'react'
import PropTypes from 'prop-types'

const navigate = (fn, path) => event => fn(path)
const HomePage = ({ history }) => (
  <div className='home-wrapper'>
    <h1>TEX Hackathon</h1>
    <h4>Open up the bank!</h4>

    <div>
      <h3>What's this boilerplate for?</h3>
      <p>
        The purpose of this boilerplate is to, at the best case scenario, give you a head start implementing your own application by connecting you to the Alpha AppCenter.<br />
        As the worst case scenario, you get to take a peek at code examples on how to make, for example, a payment.
      </p>
      <button onClick={navigate(history.push, '/payments')}>Take me to the payments page!</button>

      <h3>What's behind this?</h3>
      <p>
        This boilerplate is a very simplified version of a full blown React & Redux boilerplate, to get you started.
        It still has the bases of <a href='https://reactjs.org/'>React</a> and <a href='https://redux.js.org/'>Redux</a> but, we've trimmed all the more complicated (also interesting!) bits to allow true hacking to occur.
        <br />
        Feel free to dive into <a href='https://github.com/Cloudoki/react-redux-donderstarter'>the complete boilerplate</a> and get all the niceties!
        <br /><br />
        You'll find a detailed description on the code structure and where things are suposed to be on the README.md file.
        <br />
        This boilerplate already contains:
        <ul>
          <li><strong>Generators:</strong> You can generate Components (reuseable blocks) and Containers (typically pages) with example code to move faster. Check out the README.md how to us these.</li>
          <li><strong>Material UI:</strong> We've already included <a href='https://material-ui.com/'>Material UI</a> as a styling base.</li>
          <li><strong>MockAPI:</strong> An easy to launch and use local database. Check out the README.md how to kickstart and interact with this in just a few seconds.</li>
        </ul>
      </p>

      <h3>More documentation</h3>
      <p>Don't forget to checkout the <a href='https://appcenter.innofactory.io/docs/faq'>FAQ pages</a> for the event, as well as the all the other specific documentation regarding the Alpha AppCenter and the APIs themselves.</p>
      
      <br />
      <h2>Have fun!</h2>
    </div>
  </div>
)

HomePage.propTypes = {
  history: PropTypes.object.isRequired
}

export default HomePage
