import React from 'react'
import ReactDOM from 'react-dom'
import axiosinit from './utils/js/http.js'
import App from './App'
import * as api from './utils/js/api.js'
import dayjs from 'dayjs'

React.$axios = axiosinit
React.$api = api
React.$dayjs = dayjs

ReactDOM.render(<App />, document.getElementById('root'))
