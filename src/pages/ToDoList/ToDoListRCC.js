import React, { Component } from 'react'
import Axios from "axios"
import "./ToDoList.css"
export default class ToDoListRCC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      values: {
        taskName: ""
      },
      errors: {
        taskName: ""
      }
    }
  }
  getTaskList = () => {
    Axios.get("http://svcy.myclass.vn/api/ToDoList/GetAllTask")
      .then((response) => {
        // console.log("this is data:", response.data)
        this.setState({
          taskList: response.data
        })
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  renderTaskToDo = () => {
    return this.state.taskList.filter(item => !item.status).map((item, index) => {
      return <li key={index}>
        <span>{item.taskName}</span>
        <div className="buttons">
          <button className="remove">
            <i className="fa fa-trash-alt" />
          </button>
          <button className="complete">
            <i className="far fa-check-circle" />
            <i className="fas fa-check-circle" />
          </button>
        </div>
      </li>
    })
  }
  renderTaskToDone = () => {
    return this.state.taskList.filter(item => item.status).map((item, index) => {
      return <li key={index}>
        <span>{item.taskName}</span>
        <div className="buttons">
          <button className="remove">
            <i className="fa fa-trash-alt" />
          </button>
          <button className="complete">
            <i className="far fa-check-circle" />
            <i className="fas fa-check-circle" />
          </button>
        </div>
      </li>
    })
  }
  handleChange = (e) => {
    let { value, name } = e.target
    let newValues = { ...this.state.values }
    newValues = { ...newValues, [name]: value }
    let newErrors = { ...this.state.errors }
    let regexString = /^[a-z A-Z]+$/
    if (!regexString.test(value) || !value.trim() === "") {
      newErrors[name] = name + "in valid"
    } else
      newErrors[name] = ''
    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors
    })
  }
  componentDidMount() {
    this.getTaskList()
  }
  addTask = (e) => {
    e.preventDefault()
    Axios.post('http://svcy.myclass.vn/api/ToDoList/AddTask', {
      taskName: this.state.values.taskName
    })
      .then((response) => {
        // console.log(response)
        this.getTaskList()
      })
      .catch((error) => {
        alert(error.response.data)
      })

  }
  render() {
    return (
      <form onSubmit={(e) => { this.addTask(e) }}>
        <div className="card">
          <div className="card__header">
            <img src="./img/X2oObC4.png" alt='img' />
          </div>
          <div className="card__body">
            <div className="card__content">
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>September 9,2020</p>
              </div>
              <div className="card__add">
                <input name='taskName' id="newTask" type="text"
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Enter an activity..." />
                <button id="addItem">
                  <i className="fa fa-plus" />
                </button>
              </div>
              <p>{this.state.errors.taskName}</p>

              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskToDone()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
