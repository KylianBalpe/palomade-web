export type GetCompanyShippingsRequest = {
  token: string;
  companyId: string;
  search?: string;
  page?: number;
};

export type GetCompanyShippingDetailRequest = {
  token: string;
  companyId: string;
  code: string | string[];
};

export type GetAvailableDriversRequest = {
  token: string;
  companyId: string;
};

export type AssignDriverRequest = {
  token: string;
  companyId: string;
  code: string;
  email: string;
};

export type CreateShippingRequest = {
  token: string;
  companyId: string;
  values: {
    landId: string;
    weight: number;
  };
};

export type UpdateShippingRequest = {
  token: string;
  companyId: string;
  code: string;
  values: {
    landId?: string;
    weight?: number;
  };
};

export type CancelShippingRequest = {
  token: string;
  companyId: string;
  code: string;
};

export type GetDriverShippingRequest = {
  token: string;
  search?: string;
  page?: number;
};

export type GetDriverShippingsDetailsRequest = {
  token: string;
  code: string | string[];
};

export type StartShippingRequest = {
  companyId: string;
  code: string | string[];
  token: string;
};

export type CreateShippingDetailRequest = {
  companyId: string;
  code: string | string[];
  token: string;
  values: {
    detail: string;
    place_name: string;
  };
};

export type FinishShippingRequest = {
  companyId: string;
  code: string | string[];
  token: string;
};
