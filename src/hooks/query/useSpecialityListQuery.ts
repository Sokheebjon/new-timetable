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


export const useSpecialityListQuery = (params = {}, options?: Omit<UseQueryOptions<TGroups, AxiosError>, "queryKey">) => {
    return  useQuery<TGroups, AxiosError>({
        queryKey: ["/hemis/speciality-list", params],
        queryFn: async () => {
            return await request.get('/hemis/speciality-list', {params});
        },
        ...options
    });
};
