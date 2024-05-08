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
