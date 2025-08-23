# Test stage for running Go tests in Docker
FROM golang:1.22-alpine AS test
WORKDIR /app
COPY . .
RUN go test ./...
# Dockerfile for Go backend
FROM golang:1.22-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server main.go

FROM alpine:latest
WORKDIR /app
COPY --from=build /app/server ./server
COPY profiles.db ./profiles.db
EXPOSE 4000
ENV PORT=4000
CMD ["./server"]
