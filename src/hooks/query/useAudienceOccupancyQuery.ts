import {request} from "@/services/api";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";

export interface TCourses {
    exactMatch: boolean;
    frequency: number
    id: string;
    name: string
    priority: number
}


export const useAudienceOccupancyQuery = (params = {}, options?: Omit<UseQueryOptions<TCourses, AxiosError>, "queryKey">) => {
    return  useQuery<TCourses, AxiosError>({
        queryKey: ["/hemis/audience-occupancy", params],
        queryFn: async () => {
            return await request.get('/hemis/audience-occupancy', {params});
        },
        ...options
    });
};
