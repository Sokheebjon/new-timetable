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


export const useLessonPairsQuery = (params = {}, options?: Omit<UseQueryOptions<TGroups, AxiosError>, "queryKey">) => {
    return  useQuery<TGroups, AxiosError>({
        queryKey: ["/hemis/lesson-pairs", params],
        queryFn: async () => {
            return await request.get('/hemis/lesson-pairs', {params});
        },
        ...options
    });
};
