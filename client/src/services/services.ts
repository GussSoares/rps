import { api } from "@/services/api"
import { ServiceUpdate } from "@/types/services";

export const getService = async (id: string) => {
  const response = await api.request({
    method: 'GET',
    url: `service/${id}/`,
  });
  return response.data
}

export const listServices = async (page: number, perPage: number, sortBy: string) => {
  const response = await api.request({
    method: 'GET',
    url: `service/`,
    params: {
      page,
      per_page: perPage,
      order_by: sortBy
    }
  });
  return response.data
}

export const updateService = async (id: string, data: ServiceUpdate) => {
  const response = await api.request({
    method: 'PATCH',
    url: `service/${id}/`,
    data: data
  });
  return response.data
}

export default {
  getService,
  listServices,
  updateService
};