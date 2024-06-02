export const prod = process.env.NODE_ENV ?? process.env.NEXT_PUBLIC_NODE_ENV;


export const url = prod === "production" ? "http://localhost/api" : "http://localhost:3000/api";


