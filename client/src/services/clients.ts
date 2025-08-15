import { ClientUpdate } from "@/types/clients";
import { api } from "./api";


export const getClient = async (id: string) => {
  const response = await api.request({
    method: 'GET',
    url: `client/${id}/`,
  });
  return response.data
}

export const listClients = async (page: number, perPage: number, sortBy: string) => {
  const response = await api.request({
    method: 'GET',
    url: `client/`,
    params: {
      page,
      per_page: perPage,
      order_by: sortBy
    }
  });
  return response.data
}

export const updateClient = async (id: string, data: ClientUpdate) => {
  const response = await api.request({
    method: 'PATCH',
    url: `client/${id}/`,
    data: data
  });
  return response.data
}
