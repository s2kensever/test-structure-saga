import { GET_TASK_LIST } from "../constants/ToDoListConstant"

const initialState = {
    taskList: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    console.log("action in reducer:", action)
    switch (action.type) {
        case GET_TASK_LIST:
            // console.log(":", action)
            state.taskList = action.taskList
            return { ...state }

        default:
            return state
    }
}
