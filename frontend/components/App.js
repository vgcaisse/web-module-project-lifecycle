import axios from 'axios'
import React from 'react'

import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'
const initialState = {
  message: '',
  todos: [],
  form: {
    textInput: '',
  }
}

export default class App extends React.Component {
  state = initialState
  getTodos = () => {
    axios.get(URL)
      .then(res=> {
        console.log(res)
        this.setState({
          ...this.state,
          todos: res.data.data,
          message: res.data.message
        })
      })
      .catch(res=> {
        this.setState({
          ...this.state,
          message: res.data.message
        })
      })
  }

  addTodo = () => {
    const { todos, form: { textInput }, } = this.state
    const newTodo = { 
      name: textInput, 
      completed: false 
    }
    axios.post(URL, newTodo)
      .then(res=> {
        this.setState({
          todos: [ ...todos, res.data.data.name],
        })
      })
  }

  toggleCompleted = (id) => {
    console.log(id)
    axios.patch(`http://localhost:9000/api/todos/:id`)
      .then(res=> {
        this.setState({ 
          ...this.state, 
          todos: this.state.todos.map(todo=> {
            if(todo.id === id) {
              return {
                ...todo,
                completed: !todo.completed
              }
            } else {
              return todo
            }
          })  
        })
      })
    
  }

  clearCompleted = () => {
    // console.log(id)
    axios.patch(`http://localhost:9000/api/todos/:id`)
      .then(res=> {
        this.setState({ 
          ...this.state, 
          todos: res.data.data.filter(todo=> {
            return (todo.completed === false)
          })  
        })
      })
    
  }

  inputChange = (key, value) => {
    this.setState({
      ...this.state,
      form: { ...this.state.form, [key]: value },
    })
  }

  componentDidMount() {
    this.getTodos()
    console.log('Your todos')
  }

  render() {
    const { todos, form, name } = this.state
    return (
      <div>
        <h2>Todos:</h2>
        <h2>{this.state.message}</h2>
        <TodoList todos={todos} toggleCompleted={this.toggleCompleted} key={name}/>
        <Form  values={form} onChange={this.inputChange} onSubmit={this.addTodo} /> 
        <div>
          <button onClick={this.clearCompleted}>Clear Completed</button>
        </div>
      </div>
    )
  }
}

// todos={todos} toggleCompleted={this.toggleCompleted}
// onChange={this.inputChange} values={form} onSubmit={this.addTodo}
// onClick={this.clearCompleted}