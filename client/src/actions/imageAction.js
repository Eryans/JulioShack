import axios from "axios";

export async function getUserImage(userId) {
  const res = await axios.get(`/api/images/user-images/${userId}`);
  return res.data;
}
export async function getPublicImages(limit) {
  const res = await axios.get(`/api/images/public-images/${limit}`);
  return res.data;
}

export async function uploadUserImage(userId, dataToSubmit) {
  const res = await axios.post(
    `/api/images/upload-user-image/${userId}`,
    dataToSubmit
  );
  return res.data;
}

export async function setUserImagePrivacy(userId, imageId, dataToSubmit) {
  const res = await axios.put(
    `/api/images/set-user-image-privacy/${userId}/${imageId}`,
    dataToSubmit
  );
  return res.data;
}

export async function deleteUserImage(imageId) {
  return axios.delete(`/api/images/delete-images/${imageId}`).then((response) => {
    return response.data;
  });
}
