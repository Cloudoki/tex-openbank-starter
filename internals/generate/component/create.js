const fs = require('fs')
const path = require('path')
const addStyleImport = require('../util/addStyleImport')
const componentTemplate = require('./templates/component')
const indexTemplate = require('./templates/index')
const stylesTemplate = require('./templates/styles.scss')

module.exports = function (data) {
  const folder = path.resolve(process.cwd(), 'src', 'components', data.name)

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }

  const withSCSS = data.include.includes('SCSS')
  const mainFile = path.resolve(folder, `${data.name}.js`)
  const indexFile = path.resolve(folder, 'index.js')
  fs.writeFileSync(mainFile, componentTemplate(data.name, withSCSS))
  fs.writeFileSync(indexFile, indexTemplate(data.name))

  if (withSCSS) {
    const stylesFile = path.resolve(folder, '_styles.scss')
    fs.writeFileSync(stylesFile, stylesTemplate(data.name))
    addStyleImport('components', data.name)
  }
}
