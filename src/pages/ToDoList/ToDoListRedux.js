import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Axios from "axios"
import "./ToDoList.css"
import { GET_TASK_LIST } from '../../redux/constants/ToDoListConstant'
import { addTaskAPI, getTaskListAPI } from '../../redux/actions/ToDoListAction'
// import ToDoListReducer from '../../redux/reducers/ToDoListReducer'
export default function ToDoListRedux() {
    let { taskList } = useSelector(state => state.ToDoListReducer)
    let [state, setState] = useState({
        values: {
            taskName: ""
        },
        errors: {
            taskName: ""
        }
    })
    // const disPatch = useDispatch();
    const dispatch = useDispatch()
    const getTaskList = () => {
        dispatch(getTaskListAPI())
    }
    useEffect(() => {
        getTaskList()
    }, [])

    const addTask = (e) => {
        e.preventDefault()
        dispatch(addTaskAPI(state.values.taskName))

    }
    const deleteTask = (taskName) => {
        // e.preventDefault();
        console.log("deltete:", taskName)
        Axios.delete(`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`)
            .then((response) => {
                console.log("after deltete:", response)
                getTaskList()
            })
            .catch((error) => {
                console.log("This is error")
                console.log(error)
            })
    }

    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove">
                        <i className="fa fa-trash-alt" onClick={() => deleteTask(item.taskName)} />
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

    return (
        // <form >
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
                            <i className="fa fa-plus" onClick={(e) => addTask(e)} />
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
        // </form >

    )
}
