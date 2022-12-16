/* eslint-disable no-unused-vars */
import { applyMiddleware, combineReducers, legacy_createStore as createStore, } from 'redux'
import ToDoListReducer from './reducers/ToDoListReducer'
import reduxThunk from "redux-thunk"
import createReduxSaga from "redux-saga"
import { rootSaga } from './sagas/rootSaga'
const middleWareSaga = createReduxSaga()
const rootReducer = combineReducers({
    ToDoListReducer
})


const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga))
// Call saga
middleWareSaga.run(rootSaga)

export default store
