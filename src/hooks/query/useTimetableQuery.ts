import {request} from "@/services/api";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";

export interface TGroups {
    exactMatch: boolean;
    frequency: number
    id: string;
    name: string
    priority: number
}


export const useTimetableQuery = (params = {}, options?: Omit<UseQueryOptions<TGroups, AxiosError>, "queryKey">) => {
    return  useQuery<TGroups, AxiosError>({
        queryKey: ["/hemis/schedule-list", params],
        queryFn: async () => {
            return await request.get('/hemis/schedule-list', {params});
        },
        ...options
    });
};
