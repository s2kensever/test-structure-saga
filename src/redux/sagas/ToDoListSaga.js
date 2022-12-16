import Axios from "axios"
import { call, fork, put, take, takeLatest } from "redux-saga/effects"
import { GET_TASK_LIST } from "../constants/ToDoListConstant"
import { toDoListService } from "../../services/ToDoListService"
function* getTaskAPI(action) {
    console.log("chay vao get task api in todolist saga")
    let { data, status } = yield call(toDoListService.getTaskAPIService)

    yield put({
        type: GET_TASK_LIST,
        taskList: data
    })
}

export function* theoDoiActionToDoList() {
    yield takeLatest("xuatdata", getTaskAPI)
}