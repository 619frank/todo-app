import React,{useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import backendConfig from '../../../backendConfig'

const ListBucketsAndTodos = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.TodoReducer.todos)
  const [updateData, setUpdateData] = useState({
    id: null,
    message: "message",
  });

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

  const handleUpdateTodo = (e) => {
      let id = e.target.getAttribute("data-idval");
      let message = e.target.value;
      let newTodos = todos.map((todo) => {
        if (todo.id == id) {
          todo.message = message;
        }
        return todo;
      });
      dispatch({ type: "setTodos", payload: { todos: newTodos } }); 
      setUpdateData({ id, message });
  }

  const updateTodoHandler = async (e) => {
    e.preventDefault()
    let id = updateData.id;
    let message = updateData.message;
    // console.log(message);    
    const data = new FormData(e.target);
    console.log(data)
    try {
      let response = await axios.put(
        `${backendConfig.baseUrl}/api/update_todo/`,
        {
          id,
          message,
        }
      );

      let newTodos = todos.map((todo) => {
        if (todo.id == id) {
          todo.message = message;
        }
        return todo;
      });      
      dispatch({ type: "setTodos", payload: { todos: newTodos } });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row align-item-start">
        <div className="col">
          <ul className="list-group">
            {todos.length
              ? todos.map((todo, index) => (
                  <li key={index} className="list-group-item">
                    <div className="row">
                      <div className="col">
                        Bucket Name:{" "}
                        <span className="font-weight-bold">
                          {todo.bucket_name}
                        </span>
                      </div>
                      <div className="col">
                        <form className="form-inline" onSubmit={updateTodoHandler}>
                          <div className="form-group">
                            <input
                              name="message"
                              type="text"
                              className="form-control"
                              value={todo.message}
                              onChange={handleUpdateTodo}
                              style={{ width: "150px" }}
                              data-idval={todo.id}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm ml-3"
                          >
                            Update
                          </button>
                        </form>
                      </div>
                      <div className="col">
                        {" "}
                        <div className="ml-1 form-check form-check-inline">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            checked={todo.done}
                            onChange={handleTodoDone}
                            data-idval={todo.id}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                          >
                            Done
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <button
                          className="btn btn-sm btn-danger"
                          data-idval={todo.id}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListBucketsAndTodos
