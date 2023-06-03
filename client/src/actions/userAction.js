import axios from "axios";

export async function deleteUser(userId){
    return axios.delete(`/api/auth/delete-user/${userId}`).then(res => res.data)
}