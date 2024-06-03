import {
  AssignDriverRequest,
  CancelShippingRequest,
  CreateShippingDetailRequest,
  CreateShippingRequest,
  FinishShippingRequest,
  GetAvailableDriversRequest,
  GetCompanyShippingDetailRequest,
  GetCompanyShippingsRequest,
  GetDriverShippingRequest,
  GetDriverShippingsDetailsRequest,
  StartShippingRequest,
  UpdateShippingRequest,
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
      body: JSON.stringify(request.values),
    });
    return res;
  } catch (error) {
    throw new Error("Failed to create shipping");
  }
}

export async function updateShipping(request: UpdateShippingRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/shipping/${request.code}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${request.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request.values),
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to update shipping");
  }
}

export async function cancelShipping(request: CancelShippingRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/shipping/${request.code}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to cancel shipping");
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

export async function getCompanyShippingsDetail(
  request: GetCompanyShippingDetailRequest,
) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/shipping/${request.code}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );

    return res;
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

export async function assignDriverToShippings(request: AssignDriverRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/shipping/${request.code}/assign-driver`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${request.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: request.email }),
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to assign driver");
  }
}

export async function getDriverShippings(request: GetDriverShippingRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/my-shippings?search=${request.search}&size=10&page=${request.page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );

    return res;
  } catch (error) {
    throw new Error("Failed to get driver shippings");
  }
}

export async function getDriverShippingsDetail(
  request: GetDriverShippingsDetailsRequest,
) {
  try {
    const res = await fetch(`${baseUrl}/api/my-shipping/${request.code}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error("Failed to get driver shippings detail");
  }
}

export async function createShippingDetail(
  request: CreateShippingDetailRequest,
) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/shipping/${request.code}/details`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${request.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request.values),
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to create shipping detail");
  }
}

export async function startShipping(request: StartShippingRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/shipping/${request.code}/start`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to start shipping");
  }
}

export async function finishShipping(request: FinishShippingRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/shipping/${request.code}/finish`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to finish shipping");
  }
}
