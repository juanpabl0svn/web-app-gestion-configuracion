import { promises as fs } from "fs";

interface IUSER {
  name: number;
  username: string;
  password: string;
  list: any[];
}

const archivoDB = "./src/app/api/database.json";

// CREATE
export async function createUser(user: IUSER) {
  const data = await leerArchivo();
  data.push(user);
  await escribirArchivo(data);
}

// READ
export async function obtenerUser(username: string): Promise<IUSER> {
  const data = await leerArchivo();
  return data.filter((u: IUSER) => u.username === username)?.[0];
}

// UPDATE
export async function actualizarUsers(username: string, newData: IUSER) {
  const data: IUSER[] = await leerArchivo();
  const index = data.findIndex((u: IUSER) => u.username === username);
  if (index !== -1) {
    data[index] = newData;
    console.log(data[index]);
    await escribirArchivo(data);
  }
}

// DELETE
export async function eliminarUsers(username: string) {
  let data = await leerArchivo();
  data = data.filter((u: IUSER) => u.username !== username);
  await escribirArchivo(data);
}

// Funciones de utilidad
async function leerArchivo() {
  const data = await fs.readFile(archivoDB, "utf8");
  return JSON.parse(data);
}

async function escribirArchivo(data: any) {
  await fs.writeFile(archivoDB, JSON.stringify(data, null, 2), "utf8");
}
