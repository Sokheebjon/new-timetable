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


export const useGroupsQuery = (params = {}, options?: Omit<UseQueryOptions<TGroups, AxiosError>, "queryKey">) => {
    return  useQuery<TGroups, AxiosError>({
        queryKey: ["/hemis/groups", params],
        queryFn: async () => {
            return await request.get('/hemis/groups-list', {params});
        },
        ...options
    });
};
