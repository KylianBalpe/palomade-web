export type GetCompaniesRequest = {
  token: string;
};

export type GetCompanyRequest = {
  token: string;
  companyId: string;
};

export type GetEmployeeByCompanyRequest = {
  token: string;
  companyId: string;
  search?: string;
  page?: number;
};

export type AddEmployeeRequest = {
  companyId: string;
  token: string;
  data: {
    email: string;
    role: string;
  };
};

export type UpdateEmployeeRequest = {
  token: string;
  companyId: string;
  userId: number;
  data: {
    role: string;
  };
};

export type RemoveEmployeeRequest = {
  token: string;
  companyId: string;
  userId: number;
};

export type UploadLogoRequest = {
  token: string;
  companyId: string;
  logo: any;
};

export type UpdateCompanyInformationRequest = {
  token: string;
  companyId: string;
  data: {
    name?: string;
    address?: string;
    description?: string;
    coordinates?: string;
  };
};

export type CompanyAffiliationRequest = {
  name: string;
  address: string;
  coordinates: string;
  description: string;
  requestedBy: string;
};
