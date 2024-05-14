import { GetCompanyLandsRequest } from "@/types/land-type";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCompanyLands(request: GetCompanyLandsRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/${request.companyId}/lands`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });
    return res;
  } catch (error) {
    throw new Error("Failed to get company lands");
  }
}
