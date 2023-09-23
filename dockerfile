# Use uma imagem base do Node.js, especificando a versão desejada
FROM node:20

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Copie os arquivos de configuração e as dependências do aplicativo para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install && npm install typescript && npx prisma generate

# Copie todo o código-fonte do aplicativo para o contêiner
COPY . .

# Compile o código TypeScript (substitua pelo seu comando de compilação específico)
RUN ls
RUN npx prisma generate
RUN npm run dev

# Expõe a porta em que o aplicativo está sendo executado (substitua pela porta do seu aplicativo)
EXPOSE 3000

# Comando para iniciar o aplicativo (substitua pelo seu comando de start específico)
RUN ls
CMD [ "npm", "dev" ]
