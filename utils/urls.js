export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || process.env.NEXT_PUBLIC_LOCAL_MAGIC_KEY;

/**
 * Given an image return the Url
 * Works for local or deployed images
 * @param {any} image
 */
export const fromImgToUrl = (image) => {
    if(!image){
        return "/vercel.svg";
    }
    if(image.url.indexOf('/') === 0){
        return `${API_URL}${image.url}`;
    }
    return image.url
}