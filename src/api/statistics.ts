import axios from "axios";

export function statistics() {
    return axios.get<any>('/admin/statistics');
}
export function updateTribe() {

}
