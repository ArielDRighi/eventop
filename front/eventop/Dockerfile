# Etapa de desarrollo
FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Copiar solo los archivos de dependencias para aprovechar la caché
COPY package.json package-lock.json ./

# Instalar dependencias necesarias
RUN npm ci --legacy-peer-deps

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 3000 para desarrollo (ajusta según sea necesario)
EXPOSE 3000

# Iniciar la aplicación en modo de desarrollo
CMD ["npm", "run", "dev"]

# Etapa de construcción (si es necesario)
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copiar solo los archivos de dependencias y los módulos ya instalados
COPY package.json package-lock.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules

# Copiar el resto del código fuente
COPY . .

# Ejecutar el build de la aplicación (usualmente con Vite o React)
RUN npm run build

# Etapa de producción
FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

# Copiar los archivos generados en el build de la aplicación
COPY --from=build /usr/src/app/dist .

# Exponer el puerto 80 para servir la aplicación en producción
EXPOSE 80

# Iniciar Nginx para servir la aplicación
CMD ["nginx", "-g", "daemon off;"]
