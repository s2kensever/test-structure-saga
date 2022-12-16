import Axios from "axios"
import { DOMAIN } from "../utils/Constants/settingSystem"
export default class ToDoListService {
    getTaskAPIService = () => {
        return Axios.get(`${DOMAIN}/GetAllTask`)
    }
}

export const toDoListService = new ToDoListService()


