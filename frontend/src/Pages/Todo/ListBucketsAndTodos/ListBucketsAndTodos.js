import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import backendConfig from '../../../backendConfig'
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
// import MenuItem from "react-bootstrap/MenuItem";


const ListBucketsAndTodos = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.TodoReducer.todos)
  const [updateData, setUpdateData] = useState({
    id: null,
    message: "message",
  });
  const [buckets, setBuckets] = useState([])
  const [newTodoData, setNewTodoData] = useState({message: '', bucket_id: 1,})

  useEffect(() => {
    let func = async () => {
      try {
        let response = await axios.get(`${backendConfig.baseUrl}/api/buckets/`);
        setBuckets(response.data)
      } catch (error) {
        console.log(error)  
      }      
    }    
    func()
  },[])
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

  const handleDeleteTodo = async (e) => {
    let id = e.target.getAttribute("data-idval");
    try {
      let response = await axios.delete(`${backendConfig.baseUrl}/api/delete_todo/${id}/`);
      let newTodos = todos.filter((todo) => {
        if (todo.id == id) {
          return false;
        }
        return true;
      });
      dispatch({ type: "setTodos", payload: { todos: newTodos } });   
    } catch (error) {
     console.log(error) 
    }

  }

  const createTaskHandler = async () => {
    try {
      let response = await axios.post(
        `${backendConfig.baseUrl}/api/create_todo/`,
        {
          bucket_id: newTodoData.bucket_id,
          message: newTodoData.message
        }
      );
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div className="row align-item-start">
        <div className="col">
          <ul className="list-group">
            <li className="list-group-item">
              <select
                onChange={(e) => {
                  setNewTodoData({...newTodoData})
                }}
              >
                {buckets.length
                  ? buckets.map((bucket, index) => (
                      <option
                        key={index}
                        // data-idvalue={bucket.id}
                        value={bucket.id}
                      >
                        {bucket.bucket}
                      </option>
                    ))
                  : ""}
              </select>
              <input value={newTodoData.message} onChange={(e) => setNewTodoData({...newTodoData, message:e.target.value})}/>
              <button onClick={createTaskHandler}>Add Task</button>
            </li>
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
                        <form
                          className="form-inline"
                          onSubmit={updateTodoHandler}
                        >
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
                          onClick={handleDeleteTodo}
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
