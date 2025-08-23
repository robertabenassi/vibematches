
# Vibematches Frontend

## Overview
Vibematches is a responsive cat matching app built with React and Material UI. It features animated wow effects, avatar stories, and interactive sidebars for a modern swipe experience.

## Features
- Responsive layout: sidebars on desktop, top bar and drawer on mobile
- Avatar stories for browsing profiles
- Like/Dislike actions with animated wow effect for matches
- Sidebar with Home/Profile menu and matched profiles
- Loader overlay and error handling
- API base URL configurable via environment variable `VITE_API_URL`

## Setup
1. Install dependencies:
	```bash
	npm install
	```
2. Start the frontend:
	```bash
	npm run dev
	```
3. Ensure the backend is running and `VITE_API_URL` is set in your environment

## Usage
- Swipe left/right to dislike/like cats
- Matched cats appear in the sidebar (desktop) or drawer (mobile)
- Click restart to reset profiles

## Testing
- Run unit tests with:
  ```bash
  npm test
  ```

## Docker Deployment

To build and run the frontend in Docker:

1. Build the Docker image:
	```powershell
	docker build -t vibematch-frontend .
	```

2. Run the container:
	```powershell
	docker run -p 8080:80 vibematch-frontend
	```


Your app will be available at http://localhost:8080

**Note for Windows users:**
Docker may prompt for authorization or administrative privileges when building or running containers. If prompted, allow access to proceed.

If you use environment variables, copy your `.env` file before building:
	```powershell
	COPY .env .env
	```

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


## License
MIT
