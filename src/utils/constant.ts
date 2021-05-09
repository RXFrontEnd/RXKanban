import { hash } from "./keyUtil";

export const API_URL = process.env.REACT_APP_API_GATEWAY_URL?.concat(process.env.REACT_APP_API_GATEWAY_STAGE as string);

const ENV_KEY = hash(API_URL as string).toString();

export const generateKey = (value: string) => ENV_KEY.concat(value.toLowerCase());

export const APP_KEY = generateKey('rxticket');