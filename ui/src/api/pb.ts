import Pocketbase from "pocketbase";
export const PB_URL = import.meta.env.VITE_PB_URL;

console.log("pb", PB_URL);

// export const BASE_URL = "http://127.0.0.1:8090";
export const pb = new Pocketbase(PB_URL);
