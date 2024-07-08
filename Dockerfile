# Node.js 이미지 사용
FROM node:19.5

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 종속성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .


# Vite 서버의 기본 포트(8085) 공개
EXPOSE 8090

# Vite 개발 서버 실행
CMD ["npm", "run", "dev"]
