import {useState} from 'react';
import axios, {AxiosResponse} from 'axios';

interface AxiosHookResponse<T> {
    data: T | null;
    error: any;
    loading: boolean;
    executeRequest: (method: string, url: string, requestData?: any) => Promise<void>;
}

const useAxios = <T>(): AxiosHookResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const executeRequest = async (method: string, url: string, requestData?: any) => {
        const headers = {
            'Content-Type': 'application/json', // Пример стандартного заголовка
            // Другие стандартные заголовки здесь
        };

        setLoading(true);
        try {
            let response: AxiosResponse<T>;
            switch (method.toUpperCase()) {
                case 'GET':
                    response = await axios.get<T>(url, {headers});
                    break;
                case 'POST':
                    response = await axios.post<T>(url, requestData, {headers});
                    break;
                case 'PUT':
                    response = await axios.put<T>(url, requestData, {headers});
                    break;
                default:
                    throw new Error('Unsupported method');
            }
            // console.log(response.data)
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return {data, error, loading, executeRequest};
};

export default useAxios;
