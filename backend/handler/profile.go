package handler

import (
	"vibematch-backend/service"

	"github.com/gofiber/fiber/v2"
)

type ProfileHandler struct {
	Service *service.ProfileService
}

// Reset profiles table and reseed, reset index
func (h *ProfileHandler) ResetProfiles(c *fiber.Ctx) error {
	if err := h.Service.ResetProfiles(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to reset profiles"})
	}
	return c.JSON(fiber.Map{"status": "reset"})
}

func (h *ProfileHandler) GetNextProfile(c *fiber.Ctx) error {
	profile, err := h.Service.NextProfile()
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No more profiles"})
	}
	// Build absolute image URL
	scheme := "http"
	if c.Protocol() == "https" {
		scheme = "https"
	}
	host := c.Hostname()
	profile.Image = scheme + "://" + host + profile.Image
	return c.JSON(profile)
}

func (h *ProfileHandler) LikeProfile(c *fiber.Ctx) error {
	var req struct {
		ID int `json:"id"`
	}
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}
	matched, err := h.Service.LikeProfile(req.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to like profile"})
	}
	return c.JSON(fiber.Map{"status": "liked", "match": matched})
}

func (h *ProfileHandler) DislikeProfile(c *fiber.Ctx) error {
	h.Service.DislikeProfile()
	return c.JSON(fiber.Map{"status": "disliked"})
}

// Get suggested profiles for swipeable UI
func (h *ProfileHandler) GetSuggestedProfiles(c *fiber.Ctx) error {
	profiles, err := h.Service.SuggestedProfiles()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch profiles"})
	}
	// Build absolute image URLs
	scheme := "http"
	if c.Protocol() == "https" {
		scheme = "https"
	}
	host := c.Hostname()
	for i := range profiles {
		profiles[i].Image = scheme + "://" + host + profiles[i].Image
	}
	return c.JSON(profiles)
}
