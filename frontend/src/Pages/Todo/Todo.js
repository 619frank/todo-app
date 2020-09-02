import React, {useState} from 'react'
import CreateBucket from './CreateBucket/CreateBucket'
import ListBucketsAndTodos from './ListBucketsAndTodos/ListBucketsAndTodos'

const Todo = () => {

  return (
    <>
      <CreateBucket/>
      <ListBucketsAndTodos/>
    </>
  );
}

export default Todo
