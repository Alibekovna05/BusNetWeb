import { BusResponse, Bus, BusEntry } from '../data/types'
import axios, { AxiosRequestConfig } from 'axios';

const getAxiosConfig = (): AxiosRequestConfig =>
{
    const token = sessionStorage.getItem( "jwt" );
    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    };
};

export const getBus = async (): Promise<BusResponse[]> =>
{
    const response = await axios.get( `${ import.meta.env.VITE_API_URL }/buses`, getAxiosConfig() );
    return response.data._embedded.cars;
}
export const deleteBus = async ( link: string ): Promise<BusResponse> =>
{
    const response = await axios.delete( link, getAxiosConfig() )
    return response.data
}
export const addBus = async ( bus: Bus ): Promise<BusResponse> =>
{
    const response = await axios.post( `${ import.meta.env.VITE_API_URL }/buses`, bus, getAxiosConfig() );
    return response.data;
}
export const updateCar = async ( busEntry: BusEntry ):
    Promise<BusResponse> =>
{
    const response = await axios.put( busEntry.url, busEntry.bus,
        getAxiosConfig() );
    return response.data;
}