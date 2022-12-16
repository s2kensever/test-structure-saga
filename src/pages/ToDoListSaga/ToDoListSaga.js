import React, { useEffect, useState } from 'react'
import Axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import "./ToDoList.css"
export default function ToDoListSaga() {
    let dispatch = useDispatch()
    let { taskList } = useSelector(state => state.ToDoListReducer)
    console.log("tasklit afer call useselector:", taskList)
    let [state, setState] = useState({
        // taskList: [],
        values: {
            taskName: ""
        },
        errors: {
            taskName: ""
        }
    })
    const getTaskList = () => {

    }
    useEffect(() => {
        // getTaskList()
    }, [])

    const addTask = (e) => {
        console.log("this in function addtask")

    }
    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
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
        return taskList.filter(item => item.status).map((item, index) => {
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
    const handleDispatch = () => { }

    return (
        <form onSubmit={(e) => { addTask(e) }}>
            <button className='btn btn-success' onClick={(e) => {
                e.preventDefault();
                /**
                 * Chỗ dispatch này có thể lấy từ action
                 */
                dispatch({
                    type: 'xuatdata',
                })
            }}>dispatch saga</button>
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
