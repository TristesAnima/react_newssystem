import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './App'
import * as api from './utils/js/api.js'

axios.defaults.baseURL = 'http://localhost:8000'
React.$api = api

ReactDOM.render(<App />, document.getElementById('root'))
