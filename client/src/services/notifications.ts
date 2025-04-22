import { api } from "./api";


export const getNotification = async (id: string) => {
  const response = await api.request({
    method: 'GET',
    url: `notification/${id}/`,
  });
  return response.data
}

export const getNotifications = async () => {
  const response = await api.request({
    method: 'GET',
    url: `notification/`,
  });
  return response.data
}

export const readNotificationRequest = async (id: string) => {
  const response = await api.request({
    method: 'POST',
    url: `notification/read/${id}/`,
  });
  return response.data
}