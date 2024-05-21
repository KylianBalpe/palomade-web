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
  landId: string;
  values: {
    name?: string;
    address?: string;
    coordinates?: string;
  };
};

export type DisableLandRequest = {
  token: string;
  companyId: string;
  landId: string;
};

export type GetAllLandsRequest = {
  token: string;
  search?: string;
  page?: number;
};
