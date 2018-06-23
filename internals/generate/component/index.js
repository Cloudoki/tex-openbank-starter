// Component

const choice = 'component'

// Questions
const questions = [
  {
    type: 'checkbox',
    message: 'Include files',
    name: 'include',
    choices: [{ name: 'SCSS' }],
    when: function ({ generateType }) {
      return generateType === choice
    }
  }
]

module.exports = {
  choice,
  questions
}
