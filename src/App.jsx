import IndexRouter from './router/indexRouter.js'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <IndexRouter></IndexRouter>
    </Provider>
  )
}

export default App
