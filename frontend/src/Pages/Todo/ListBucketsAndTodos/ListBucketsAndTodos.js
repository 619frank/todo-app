import React,{useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import backendConfig from '../../../backendConfig'

const ListBucketsAndTodos = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.TodoReducer.todos)

  const handleTodoDone = async (e) => {
    let id = e.target.getAttribute("data-idval");
    let done = e.target.checked;
    console.log(id)
    try {
      let response = await axios.put(
        `${backendConfig.baseUrl}/api/mark_todo/`,
        {
          id,
          done
        }
      );

      let newTodos = todos.map((todo) => {
        if (todo.id == id) {
          todo.done = done;
        }
        return todo
      });
      dispatch({ type: "setTodos", payload: { todos: newTodos } });      
    } catch (error) {      
      console.log(error)
    }
  }
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <ul className="list-group">
          {todos.length
            ? todos.map((todo, index) => (
                <li key={index} className="list-group-item">
                  {todo.message}
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      checked={todo.done}
                      onChange={handleTodoDone}
                      data-idval={todo.id}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Done
                    </label>
                  </div>
                </li>
              ))
            : ""}
        </ul>
      </div>
      <div className="col"></div>
    </div>
  );
}

export default ListBucketsAndTodos
