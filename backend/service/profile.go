package service

import (
	"vibematch-backend/domain"
	"vibematch-backend/repository"
)

type ProfileService struct {
	Repo         *repository.ProfileRepository
	CurrentIndex int
}

// Reset profiles table and reseed, reset index
func (s *ProfileService) ResetProfiles() error {
	// Reset and reseed using repository
	if err := s.Repo.ResetAndSeed(); err != nil {
		return err
	}
	s.CurrentIndex = 0
	return nil
}

func (s *ProfileService) NextProfile() (*domain.Profile, error) {
	return s.Repo.GetNextProfile(s.CurrentIndex)
}

// Like a profile and check for match
func (s *ProfileService) LikeProfile(profileID int) (bool, error) {
	// TODO: Implement match logic. For now, randomly match if profileID is even.
	s.CurrentIndex++
	matched := profileID%2 == 0 // Example: match if even
	return matched, nil
}

func (s *ProfileService) DislikeProfile() error {
	s.CurrentIndex++
	return nil
}

// Return suggested profiles from repository
func (s *ProfileService) SuggestedProfiles() ([]domain.Profile, error) {
	// For now, just return all profiles. Replace with suggestion logic if needed.
	return s.Repo.GetAllProfiles()
}
