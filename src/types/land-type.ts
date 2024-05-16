export type GetCompanyLandsRequest = {
  token: string;
  companyId: string;
  search?: string;
  page?: number;
};

export type AddLandRequest = {
  token: string;
  companyId: string;
  values: {
    name: string;
    address: string;
    coordinates: string;
  };
};

export type UpdateLandRequest = {
  token: string;
  companyId: string;
  landId: number;
  values: {
    name?: string;
    address?: string;
    coordinates?: string;
  };
};

export type DeleteLandRequest = {
  token: string;
  companyId: string;
  landId: number;
};
