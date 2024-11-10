# Usa una imagen oficial de Node.js como imagen base
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto con la opción --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos del proyecto
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto en el que la aplicación frontend escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]