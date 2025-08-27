package repository

import (
	"database/sql"
	"fmt"
	"math/rand"
	"time"
)

var names = []string{"Whiskers", "Mittens", "Tiger", "Shadow", "Simba", "Luna", "Oreo", "Pumpkin", "Cleo", "Socks"}
var images = []string{
	"/static/cat1.jpg",
	"/static/cat2.jpg",
	"/static/cat3.jpg",
	"/static/cat4.jpg",
	"/static/cat5.jpg",
	"/static/cat6.jpg",
	"/static/cat7.jpg",
	"/static/cat8.jpg",
	"/static/cat9.jpg",
	"/static/cat10.jpg",
}

func SeedProfiles(db *sql.DB) error {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM profiles").Scan(&count)
	if err != nil {
		return err
	}
	if count == 0 {
		rand.Seed(time.Now().UnixNano())
		// Create a slice of indices and shuffle it
		idx := rand.Perm(len(names))
		tx, err := db.Begin()
		if err != nil {
			return err
		}
		stmt, err := tx.Prepare("INSERT INTO profiles (name, age, image) VALUES (?, ?, ?)")
		if err != nil {
			return err
		}
		defer stmt.Close()
		for i := 0; i < len(names); i++ {
			name := names[idx[i]]
			age := 1 + i // deterministic age for each cat
			image := images[idx[i]]
			if _, err := stmt.Exec(name, age, image); err != nil {
				tx.Rollback()
				return fmt.Errorf("failed to insert profile: %w", err)
			}
		}
		return tx.Commit()
	}
	return nil
}
