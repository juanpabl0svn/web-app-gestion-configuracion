# Usamos la imagen oficial de Node.js como base
FROM node:latest

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el package.json y el package-lock.json (o yarn.lock si usas Yarn)
COPY package*.json ./
# COPY package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Construimos la aplicación de Next.js
RUN npm run build

# Exponemos el puerto en el que corre la aplicación de Next.js
EXPOSE 3000

# Definimos las variables de entorno necesarias
ENV NODE_ENV=production
ENV API_URL=http://localhost:3000/api

# Ejecutamos el servidor Next.js
CMD ["npm", "start"]
