export const prod = process.env.NODE_ENV ?? process.env.NEXT_PUBLIC_NODE_ENV;


export const url = prod === "production" ? "https://notes-lake-five.vercel.app/api" : "http://localhost:3000/api";


