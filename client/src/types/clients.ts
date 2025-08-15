
export type Clients = {
  id: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string;
};

export type ClientUpdate = {
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  name?: string;
  email?: string;
  phone?: string;
};
