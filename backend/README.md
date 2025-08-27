
# Vibematch Golang Backend API Contract

## Base URL
`http://<host>:<port>/v1`

## Data Model
### Profile
```
{
	"id": int,
	"name": string,
	"image": string, // absolute URL
	"age": int
}
```

## Endpoints

### GET `/v1/profiles/next`
Returns the next profile to swipe.
**Response:**
```
200 OK
{
	"id": int,
	"name": string,
	"image": string,
	"age": int
}
```
404 Not Found
```
{
	"error": "No more profiles"
}
```

### GET `/v1/profiles/suggested`
Returns all suggested profiles for swipeable UI.
**Response:**
```
200 OK
[
	{
		"id": int,
		"name": string,
		"image": string,
		"age": int
	},
	...
]
```
500 Internal Server Error
```
{
	"error": "Failed to fetch profiles"
}
```

### POST `/v1/profiles/like`
Likes the current profile and moves to the next.
**Request Payload:**
```
{
	"id": int
}
```
**Response:**
```
200 OK
{
	"status": "liked",
	"match": bool // true if a match occurred
}
```
500 Internal Server Error
```
{
	"error": "Failed to like profile"
}
```

### POST `/v1/profiles/dislike`
Dislikes the current profile and moves to the next.
**Response:**
```
200 OK
{
	"status": "disliked"
}
```

### POST `/v1/profiles/reset`
Resets the profiles table and reseeds demo data.
**Response:**
```
200 OK
{
	"status": "reset"
}
```
500 Internal Server Error
```
{
	"error": "Failed to reset profiles"
}
```

## Error Responses
- 404: `{ "error": "No more profiles" }`
- 500: `{ "error": "Internal server error" }` or `{ "error": "Failed to ..." }`

## Notes
- No authentication required.
- Profiles are static for demo purposes.
- Written in Go, see `main.go` and `main_test.go` for implementation and tests.

## Docker Deployment

To build and run the backend in Docker:

1. Build the Docker image:
	```powershell
	docker build -t vibematch-backend .
	```

2. Run the container, mapping to localhost:4000:
	```powershell
	docker run -p 4000:4000 vibematch-backend
	```

Your backend will be available at http://localhost:4000
