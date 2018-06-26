# TEX Hackathon - React boilerplate

This boilerplate is designed to get you up and running with React/Router/Redux workflow, backed up by webpack.

## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#installation)
1. [Development](#development)
1. [Project Structure](#project-structure)
1. [Caveats](#caveats)

## Requirements
* node `^5.0.0`
* yarn `^0.22.0`

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can create a new project based on `tex-openbank-starter` by doing the following:

```bash
$ git clone https://github.com/Cloudoki/tex-openbank-starter.git <my-project-name>
$ cd <my-project-name>
```

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will suffice.

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

## Development

After completing the [installation](#installation) step, you're ready to start developing your App!

```bash
$ yarn dev  # Start the development server (or `npm run dev`)
```

Hot reloading is enabled by default for both **JavaScript** and **SCSS** files.

All scripts at your disposal:

|`yarn <script>`    |Description|
|-------------------|-----------|
|`dev`            	|Serves your app at `localhost:9000`|
|`mock-api`			    |Serves a mock api at `localhost:9004` - see [json-server](https://github.com/typicode/json-server) for more|
|`build`            |Builds the application to ./dist|
|`generate`         |Generates a quick `component` or `container` with input choices|

## Project Structure

Containers use the [ducks](https://github.com/erikras/ducks-modular-redux) approach, with small changes. Instead of having the effects in the `ducks.js` file we preserve the sagas file to prevent our files of having more than 150/200 lines of code each and be easier to debug/read them. The other small change to this approach is that the middleware is also present in the `ducks.js` file, because we don't expect to have more than a couple per container, normally just one. 

All files are in the relative folder and imported when needed with the help of `webpack resolve`.

Ex: `import App from 'components/App'`

```
.
├── __mocks__                       # Unit tests mocks and db file
├── dist                            # All build-related source code
│
├── internals                       # Project development configurations
│ └── generate                      # File generation scripts
│
└── src                             # Application source code
    ├── assets                      # asset files to be required
    ├── index.html                  # Main HTML page container for app
    ├── index.js                    # Application bootstrap and rendering
    │
    ├── components                  # Global reusable components
    │   └── Component
    │       ├── _styles.scss        # Your component styles (if any)
    │       ├── Component.js        # Pure component source code (easily tested)
    │       └── index.js            # Component export (HOC should be added here if any)
    │
    ├── containers                  # Components wrapped by redux/connect
    │   └── Container
    │       ├── _styles.scss        # Your container styles (if any)
    │       ├── Component.js        # Pure Component source code (easily tested)
    │       ├── ducks.js            # Reducer, action creators, contstants and middleware
    │       └── index.js            # Component export with HOC (connect in this case)
    │
    ├── constants                   # Global constants
    │
    ├── store
    │   ├── combinedReducers.js     # Combine all reducers in one place
    │   └── index.js                # Redux store bootstrap
    │
    ├── styles                      # Global styles
    └── util
        ├── getDefaultHeaders.js    # Helper to inject headers on requests
        └── request.js              # Fetch API handler
```

## Caveats

Some times `node-sass` have build problems on linux environments, probable solution:

- Bring your node version to `^6.0.0`
- Run `npm rebuild node-sass`
	- You need to run `npm rebuild node-sass` everytime `node-sass` package is installed.
