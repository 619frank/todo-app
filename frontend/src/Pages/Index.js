import React,{useEffect} from 'react'
import Todo from './Todo/Todo'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'
import { useDispatch } from "react-redux";
import backendConfig from '../backendConfig'

const Index = () => {
  useEffect(() => {
    let func = async () => {
      try {        
        let response = await axios.get(`${backendConfig.baseUrl}/api/todos/`);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    func()
  },[])
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Todo App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/">
            <Todo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Index
