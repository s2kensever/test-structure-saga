import { all } from "redux-saga/effects"
import * as ToDoListSaga from "./ToDoListSaga"
export function* rootSaga() {
    yield all([
        ToDoListSaga.theoDoiActionToDoList()
    ])
}