import axios from "axios";

export async function getUserImage(userId) {
  const res = await axios.get(`/api/images/user-images/${userId}`);
  return res.data;
}

export async function uploadUserImage(userId, dataToSubmit) {
  const res = await axios.post(
    `/api/images/upload-user-image/${userId}`,
    dataToSubmit
  );
  return res.data;
}
