import { getDashboardSummary } from "@/actions/summary.actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchDashboardSummaryReport = async (
  params: QueryParams,
  token: string
) => {
  const data = await getDashboardSummary(token, params);
  return data;
};

export const useDashboardSummaryReport = (
  params: QueryParams,
  token: string
) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<DashboardSummaryResponse, Error>({
    queryKey: ["generalSalesReport", params],
    queryFn: () => fetchDashboardSummaryReport(params, token),
    // staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    generalSalesReport: data || [],
    loading: isLoading,
    error: error ? error.message : null,
    refetch: () =>
      queryClient.invalidateQueries({
        queryKey: ["generalSalesReport", params],
      }),
  };
};
