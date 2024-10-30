import {request} from "@/services/api";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";

export interface TFaculties {
    exactMatch: boolean;
    frequency: number
    id: string;
    name: string
    priority: number
}


export const useFacultiesQuery = (params = {}, options?: Omit<UseQueryOptions<TFaculties, AxiosError>, "queryKey">) => {
    return  useQuery<TFaculties, AxiosError>({
        queryKey: ["/hemis/faculties-list", params],
        queryFn: async () => {
            return await request.get('/hemis/faculties-list', {params});
        },
        ...options
    });
};
