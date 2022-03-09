import React from 'react'

export default class TodoList extends React.Component {
  
  render() {
    //.....................
    const { todos, toggleCompleted } = this.props
    return (
      <div>
        <ul>
          {
            todos.map((to) => {
              const { id, name, completed } = to
              return (
                <li key={id} className='todoList' onClick={()=> toggleCompleted(id)}>
                  {name}{completed === true ? '✔️' : ''}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}