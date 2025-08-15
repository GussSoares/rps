
export type Service = {
  id: string;
  name: string;
  active: boolean;
};

export type ServiceUpdate = {
  name?: string;
  active?: boolean;
};
