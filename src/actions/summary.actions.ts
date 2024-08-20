const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";
export const getDashboardSummary = async (
  token: string,
  query: QueryParams
): Promise<DashboardSummaryResponse> => {
  const qParams = `?page=${query.page}&limit=${query.limit}&from=${query.from}&to=${query.to}`;
  const response = await fetch(
    `${BASE_URL}/summary/dashboard-summary/${qParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );

  console.log("response", response);
  if (!response.ok) {
    const error = await response.json();
    if (error.errorCode === 3001) {
      throw error;
    }
    if (error.errorCode && error.errorCode !== 3001) {
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }

  return response.json();
};
