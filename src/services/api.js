import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
})

export const apiGeo = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode'
})