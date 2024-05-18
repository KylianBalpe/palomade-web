import {
  GetCompaniesRequest,
  GetCompanyRequest,
  GetEmployeeByCompanyRequest,
  RemoveEmployeeRequest,
  UpdateEmployeeRequest,
  AddEmployeeRequest,
  UploadLogoRequest,
} from "@/types/company-type";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCompanies(request: GetCompaniesRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/companies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });
    return res;
  } catch (error) {
    throw new Error("Failed to get companies");
  }
}

export async function getCompany(request: GetCompanyRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/company/${request.companyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });
    return res;
  } catch (error) {
    throw new Error("Failed to get company");
  }
}

export async function getCompanyEmployees(
  request: GetEmployeeByCompanyRequest,
) {
  try {
    const res = await fetch(
      `${baseUrl}/api/company/${request.companyId}/employees?search=${request.search}&size=10&page=${request.page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to get company employees");
  }
}

export async function addEmployee(request: AddEmployeeRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/company/${request.companyId}/employee`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${request.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request.data),
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to add company employee");
  }
}

export async function updateEmployee(request: UpdateEmployeeRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/company/${request.companyId}/employee/${request.userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${request.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request.data),
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to update company employee");
  }
}

export async function removeEmployee(request: RemoveEmployeeRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/company/${request.companyId}/employee/${request.userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to remove company employee");
  }
}

export async function uploadLogo(request: UploadLogoRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/company/${request.companyId}/logo`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
        body: request.logo,
      },
    );

    return res;
  } catch (e) {
    throw new Error("Failed to upload image");
  }
}
