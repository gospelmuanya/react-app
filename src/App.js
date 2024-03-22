import React, { useState } from 'react'
import './index.css'


function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState('')


  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo('')
  }


  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })

    setTodos(updatedTodos)
  }
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText('')
  }
  return (
  <div className='container'>
    <h3>MY TODO LIST</h3>
    <form id="to-do" onSubmit={handleSubmit}>
      <input type="text" placeholder='New task'value={todo} required onChange={(e) => setTodo(e.target.value)}/>
      <button type='submit'>Add</button>
    </form>
    {todos && todos.map((todo) =><div className='list' key={todo.id}>
    <input type="checkbox" onChange = {() => toggleComplete(todo.id)}
      checked = {todo.completed} />

      {todoEditing === todo.id ? (<input 
      type="text" placeholder={todo.text} className='editing' onChange={(e) => setEditingText(e.target.value)}
       value = {editingText} 
      />) : (<div className='todo-text'>{todo.text}</div>)}
      <div id='btn'>
      <button onClick={() => deleteTodo(todo.id)} id='btn-1'>delete</button>
      
      {todoEditing === todo.id ? (<button className='submit' onClick={() =>editTodo(todo.id)} >submit </button>) 
      : (<button onClick={() => setTodoEditing(todo.id)} id='btn-2'>edit</button>)}
      </div>
    </div>)}
  </div>
  )
}
export default App;
