import React from 'react'

export default class Form extends React.Component {
  onSubmit = e => {
    e.preventDefault()
    this.props.onSubmit()
  }

  onChange = evt => {    
    const { value, id } = evt.target
    this.props.onChange(id, value)
    console.log(value)
  }

  render() {
    const { values } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <input 
          onChange={this.onChange}
          value={values.textInput}
          type='text'
          id='textInput'
          placeholder='What is yer todo?'
        />
          
        <input type='submit'/>
      </form>
    )
  }
}
