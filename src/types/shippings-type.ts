export type GetCompanyShippingsRequest = {
  token: string;
  companyId: string;
  search?: string;
  page?: number;
};

export type GetAvailableDriversRequest = {
  token: string;
  companyId: string;
};

export type CreateShippingRequest = {
  token: string;
  companyId: string;
  landId: number;
  weight: number;
};
