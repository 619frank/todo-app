import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import TodoReducer from './redux/reducers/TodoReducer'
import Index from './Pages/Index'

const rootReducer = combineReducers({
  TodoReducer
});

const store = createStore(rootReducer);

const App = () => {
  return(
    <Provider store={store}>
      <Index/>
    </Provider>
  )
}

export default App;