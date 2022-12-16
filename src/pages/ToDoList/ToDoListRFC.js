import React, { useEffect, useState } from 'react'
import Axios from "axios"
import "./ToDoList.css"
export default function ToDoListRFC() {
    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: ""
        },
        errors: {
            taskName: ""
        }
    })
    const getTaskList = () => {
        console.log("Chay vao day 1 lan")
        Axios.get("http://svcy.myclass.vn/api/ToDoList/GetAllTask")
            .then((response) => {
                console.log("this is data:", response.data)
                setState({
                    ...state,
                    taskList: response.data
                })
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    }
    useEffect(() => {
        getTaskList()
    }, [])

    const addTask = (e) => {
        e.preventDefault()
        Axios.post('http://svcy.myclass.vn/api/ToDoList/AddTask', {
            taskName: state.values.taskName
        })
            .then((response) => {
                // console.log(response)
                getTaskList()
            })
            .catch((error) => {
                console.log(error.response.data)
            })

    }
    const renderTaskToDo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
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
    const renderTaskToDone = () => {
        return state.taskList.filter(item => item.status).map((item, index) => {
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
    const handleChange = (e) => {
        let { value, name } = e.target
        let newValues = { ...state.values }
        newValues = { ...newValues, [name]: value }
        let newErrors = { ...state.errors }
        let regexString = /^[a-z A-Z]+$/
        if (!regexString.test(value) || !value.trim() === "") {
            newErrors[name] = name + "in valid"
        } else
            newErrors[name] = ''
        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    }

    return (
        <form onSubmit={(e) => { addTask(e) }}>
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
                                onChange={(e) => handleChange(e)}
                                placeholder="Enter an activity..." />
                            <button id="addItem">
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <p>{state.errors.taskName}</p>

                        <div className="card__todo">
                            {/* Uncompleted tasks */}
                            <ul className="todo" id="todo">
                                {renderTaskToDo()}
                            </ul>
                            {/* Completed tasks */}
                            <ul className="todo" id="completed">
                                {renderTaskToDone()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    )
}
