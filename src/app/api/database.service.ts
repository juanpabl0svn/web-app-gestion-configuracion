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
  const data = await readFile();
  data.push(user);
  await writeFile(data);
}

// READ
export async function getUser(username: string): Promise<IUSER> {
  const data = await readFile();
  return data.filter(
    (u: IUSER) => u.username.toLowerCase() === username.toLowerCase()
  )?.[0];
}

// UPDATE
export async function updateUser(newData: IUSER) {
  const data: IUSER[] = await readFile();
  const index = data.findIndex(
    (u: IUSER) => u.username.toLowerCase() === newData.username.toLowerCase()
  );
  if (index !== -1) {
    data[index] = newData;
    await writeFile(data);
  }
}

// DELETE
export async function deleteUser(username: string) {
  let data = await readFile();
  data = data.filter(
    (u: IUSER) => u.username.toLowerCase() !== username.toLowerCase()
  );
  await writeFile(data);
}

// Funciones de utilidad
async function readFile() {
  const data = await fs.readFile(archivoDB, "utf8");
  return JSON.parse(data);
}

async function writeFile(data: any) {
  await fs.writeFile(archivoDB, JSON.stringify(data, null, 2), "utf8");
}
