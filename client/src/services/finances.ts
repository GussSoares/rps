import { api } from "./api";

export const listToPayFinances = async (page: number, perPage: number, sortBy: string) => {
  const response = await api.request({
    method: 'GET',
    url: `finance/to-pay/`,
    params: {
      page,
      per_page: perPage,
      order_by: sortBy
    }
  });
  return response.data
}

export const listToReceiveFinances = async (page: number, perPage: number, sortBy: string) => {
  const response = await api.request({
    method: 'GET',
    url: `finance/to-receive/`,
    params: {
      page,
      per_page: perPage,
      order_by: sortBy
    }
  });
  return response.data
}

export const getToPayAmountByService = async () => {
  const response = await api.request({
    method: 'GET',
    url: `finance/to-pay/chart/amount-by-service/`,
  });
  return response.data
}

export const getToPayCountByService = async () => {
  const response = await api.request({
    method: 'GET',
    url: `finance/to-pay/chart/count-by-service/`,
  });
  return response.data
}