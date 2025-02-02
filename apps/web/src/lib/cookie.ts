'use server'
import {cookies} from 'next/headers';

export async function createCookie(name: string, value: string){
    const oneDay = 24 * 60 * 60 * 1000;
    const expiration = new Date(Date.now() + oneDay);
    cookies().set(name, value, { expires: expiration })
}

export async function fetchCookie(name: string){
    return cookies().get(name)?.value;
}

export async function checkCookie(name: string){
    return cookies().get(name) ? true : false;
}

export async function deleteCookie(name:string){
    cookies().delete(name);
}