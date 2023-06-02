import axios from 'axios'

export default async function getUserImage(userId) {
  const res = await axios.get(`/api/images/user-images/${userId}`);
    return res.data;
}
