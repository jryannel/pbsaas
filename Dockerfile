# build ui with nodejs
FROM node:lts-alpine3.20 AS js-builder

WORKDIR /app

COPY ui/package.json ui/package-lock.json ./

RUN npm ci

COPY ui/ ./

ENV VITE_PB_URL=http://localhost:8090

RUN npm run build

RUN echo $(ls -la dist)


# build app with golang

FROM golang:1.22-alpine AS go-builder

WORKDIR /app

# copy go.mod and go.sum files to the workspace
COPY app/go.mod app/go.sum ./

# download dependencies
RUN go mod download

# copy the source from the current directory to the working directory inside the container
COPY ./app .


# build the app
RUN go build -o server main.go


# run the app in alpine
FROM alpine:3.20 AS app

WORKDIR /app

# copy the binary from the builder stage
COPY --from=go-builder /app/server ./

# copy the ui build into the app
COPY --from=js-builder /app/dist/ ./pb_public/

# expose port 8090 to the outside world
EXPOSE 8090

# command to run the executable
CMD ./server serve --http 0.0.0.0:8090
