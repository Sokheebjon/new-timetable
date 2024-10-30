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


export const useCoursesQuery = (params = {}, options?: Omit<UseQueryOptions<TCourses, AxiosError>, "queryKey">) => {
    return  useQuery<TCourses, AxiosError>({
        queryKey: ["/hemis/courses-list", params],
        queryFn: async () => {
            return await request.get('/hemis/courses-list', {params});
        },
        ...options
    });
};
