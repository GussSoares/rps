import { ServiceUpdate } from "@/types/services";
import client from "@/services/services";


export const useService = () => {

  const getService = async (id: string) => await client.getService(id);
  const listService = async (page: number, perPage: number, sortBy: string) => await client.listServices(page, perPage, sortBy);
  const updateService = async (id: string, data: ServiceUpdate) => await client.updateService(id, data);

  return { getService, updateService, listService };
}