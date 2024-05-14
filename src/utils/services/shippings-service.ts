import {
  CreateShippingRequest,
  GetAvailableDriversRequest,
  GetCompanyShippingsRequest,
} from "@/types/shippings-type";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createShipping(request: CreateShippingRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/${request.companyId}/shipping`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${request.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        land_id: request.landId,
        weight: request.weight,
      }),
    });
    return res;
  } catch (error) {
    throw new Error("Failed to create shipping");
  }
}

export async function getCompanyShippings(request: GetCompanyShippingsRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/shippings?search=${request.search}&size=10&page=${request.page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to get company shippings");
  }
}

export async function getShippingsDetail(
  token: string,
  code: string,
  companyId: string,
) {
  try {
    const res = await fetch(`${baseUrl}/api/${companyId}/shipping/${code}`, {
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
    throw new Error("Failed to get shippings detail");
  }
}

export async function getAvailableDrivers(request: GetAvailableDriversRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/${request.companyId}/drivers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });
    return res;
  } catch (error) {
    throw new Error("Failed to get available drivers");
  }
}

export async function getDriverShippings(token: string) {
  try {
    const res = await fetch(`${baseUrl}/api/my-shippings`, {
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
    throw new Error("Failed to get driver shippings");
  }
}

export async function getDriverShippingsDetail(
  token: string,
  code: string | string[],
) {
  try {
    const res = await fetch(`${baseUrl}/api/my-shipping/${code}`, {
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
    throw new Error("Failed to get driver shippings detail");
  }
}

export async function createShippingDetail(
  companyId: string,
  code: string | string[],
  token: string,
  values: {
    detail: string;
    place_name: string;
  },
) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${companyId}/shipping/${code}/details`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to create shipping detail");
  }
}

export async function startShipping(
  companyId: string,
  code: string | string[],
  token: string,
) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${companyId}/shipping/${code}/start`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to start shipping");
  }
}

export async function finishShipping(
  companyId: string,
  code: string | string[],
  token: string,
) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${companyId}/shipping/${code}/finish`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to finish shipping");
  }
}
