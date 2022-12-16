import Axios from "axios"
import { useDispatch } from "react-redux"
import { GET_TASK_LIST } from "../constants/ToDoListConstant"



export const getTaskListAPI = () => {
    // console.log("run action")
    /**
     * dispatch sau khi gọi api => Tạo req
     */
    return dispatch => {
        console.log("Chạy depatch")
        Axios.get("http://svcy.myclass.vn/api/ToDoList/GetAllTask")
            .then((response) => {
                console.log("Lấy data thành công")
                dispatch({
                    type: GET_TASK_LIST,
                    taskList: response.data
                })
            })
            .catch((error) => {
                console.log("Lỗi rồi")
                console.log(error);
            })
    }
}
export const addTaskAPI = (taskName) => {
    return dispatch => {
        Axios.post('http://svcy.myclass.vn/api/ToDoList/AddTask', {
            taskName: taskName
        })
            .then((response) => {
                dispatch(getTaskListAPI())
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }
}