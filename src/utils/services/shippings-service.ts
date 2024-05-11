const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCompanyShippings(token: string, companyId: string) {
  try {
    const res = await fetch(`${baseUrl}/api/${companyId}/shippings`, {
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
