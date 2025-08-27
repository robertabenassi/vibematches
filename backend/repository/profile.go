package repository

import (
	"database/sql"
	"vibematch-backend/domain"
)

type ProfileRepository struct {
	DB *sql.DB
}

// Get all profiles from DB
func (r *ProfileRepository) GetAllProfiles() ([]domain.Profile, error) {
	rows, err := r.DB.Query("SELECT id, name, age, image FROM profiles ORDER BY id ASC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var profiles []domain.Profile
	for rows.Next() {
		var p domain.Profile
		if err := rows.Scan(&p.ID, &p.Name, &p.Age, &p.Image); err != nil {
			return nil, err
		}
		profiles = append(profiles, p)
	}
	return profiles, nil
}

func (r *ProfileRepository) GetNextProfile(currentIndex int) (*domain.Profile, error) {
	row := r.DB.QueryRow("SELECT id, name, age, image FROM profiles WHERE id > ? ORDER BY id ASC LIMIT 1", currentIndex)
	var p domain.Profile
	if err := row.Scan(&p.ID, &p.Name, &p.Age, &p.Image); err != nil {
		return nil, err
	}
	return &p, nil
}

// Add method to reset and reseed profiles
func (r *ProfileRepository) ResetAndSeed() error {
	return ResetAndSeedProfiles(r.DB)
}
