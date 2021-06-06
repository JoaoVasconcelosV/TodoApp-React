import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3333/api/todos'

export default props => {
  const [description, setDescription] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    refresh();
  }, [])

  function refresh(description = '') {
    const search = description ? `&description__regex=/${description}/` : ''
    axios.get(`${URL}?sort=-createdAt${search}`)
      .then(resp => setList(resp.data), setDescription(description));
  }  

  const handleChange = (e) => {
    setDescription(e.target.value);
  }

  const handleAdd = () => {
    const desc = description;
    axios.post(URL, { description })
      .then(resp => refresh());
  }

  const handleRemove = (todo) => {
    axios.delete(`${URL}/${todo._id}`)
      .then(resp => refresh(description));      
  }

  const handleMarkAsDone = (todo) => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(resp => refresh(description));
  }

  const handleMarkAsPending = (todo) => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then(resp => refresh(description));
  }  

  const handleSearch = () => {
    refresh(description);
  }

  const handleClear = () => {
    refresh();
  }

  return (
    <div>
      <PageHeader name="Tarefas" small="Cadastro"/>
      <TodoForm     
        handleChange={handleChange}
        description={description}    
        handleAdd={handleAdd}  
        handleSearch={handleSearch}    
        handleClear={handleClear}   
      />
      <TodoList list={list} 
        handleRemove={handleRemove} 
        handleMarkAsDone={handleMarkAsDone}
        handleMarkAsPending={handleMarkAsPending}
      />
    </div>
  )
}

