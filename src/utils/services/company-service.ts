const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCompanies(token: string) {
  try {
    const res = await fetch(`${baseUrl}/api/companies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await res.json();
    if (res.status !== 200) {
      throw new Error(response.errors);
    }
    return response;
  } catch (error) {
    throw new Error("Failed to get companies");
  }
}

export async function getCompany(token: string, companyId: string) {
  try {
    const res = await fetch(`${baseUrl}/api/company/${companyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await res.json();
    if (res.status !== 200) {
      throw new Error(response.errors);
    }
    return response;
  } catch (error) {
    throw new Error("Failed to get company");
  }
}

export async function getCompanyEmployees(token: string, companyId: string) {
  try {
    const res = await fetch(`${baseUrl}/api/company/${companyId}/employees`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await res.json();
    if (res.status !== 200) {
      throw new Error(response.errors);
    }
    return response;
  } catch (error) {
    throw new Error("Failed to get company employees");
  }
}

export async function updateEmployee(
  token: string,
  companyId: string,
  userId: number,
  role: string,
) {
  try {
    const res = await fetch(
      `${baseUrl}/api/company/${companyId}/employee/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      },
    );
    const response = await res.json();
    if (res.status !== 200) {
      throw new Error(response.errors);
    }
    return response;
  } catch (error) {
    throw new Error("Failed to update company employee");
  }
}
