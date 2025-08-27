package main

import (
	"log"
	"os"
	"vibematch-backend/handler"
	"vibematch-backend/infrastructure"
	"vibematch-backend/repository"
	"vibematch-backend/service"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	// Enable CORS for all origins
	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "*")
		c.Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		c.Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Method() == fiber.MethodOptions {
			return c.SendStatus(fiber.StatusNoContent)
		}
		return c.Next()
	})

	db, err := infrastructure.NewDB("profiles.db")
	if err != nil {
		log.Fatalf("failed to connect to db: %v", err)
	}

	// Drop, recreate, and seed profiles table using repository facilities
	if err := repository.ResetAndSeedProfiles(db); err != nil {
		log.Fatalf("failed to reset and seed profiles: %v", err)
	}

	repo := &repository.ProfileRepository{DB: db}
	svc := &service.ProfileService{Repo: repo, CurrentIndex: 0}
	handler := &handler.ProfileHandler{Service: svc}

	app.Static("/static", "./static")
	app.Get("/v1/profiles/next", handler.GetNextProfile)
	app.Get("/v1/profiles/suggested", handler.GetSuggestedProfiles)
	app.Post("/v1/profiles/like", handler.LikeProfile)
	app.Post("/v1/profiles/dislike", handler.DislikeProfile)
	app.Post("/v1/profiles/reset", handler.ResetProfiles)

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}
	log.Printf("Backend running on port %s", port)
	log.Fatal(app.Listen(":" + port))
}
