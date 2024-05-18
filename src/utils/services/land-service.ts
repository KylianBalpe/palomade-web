import {
  GetCompanyLandsRequest,
  AddLandRequest,
  UpdateLandRequest,
  DisableLandRequest,
} from "@/types/land-type";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCompanyLands(request: GetCompanyLandsRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/lands?search=${request.search}&size=10&page=${request.page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to get company lands");
  }
}

export async function addLands(request: AddLandRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/${request.companyId}/land`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${request.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.values),
    });
    return res;
  } catch (error) {
    throw new Error("Failed to add lands");
  }
}

export async function updateLands(request: UpdateLandRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/land/${request.landId}`,
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
    throw new Error("Failed to update lands");
  }
}

export async function deleteLands(request: DisableLandRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/${request.companyId}/land/${request.landId}/disable`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );
    return res;
  } catch (error) {
    throw new Error("Failed to disable lands");
  }
}
