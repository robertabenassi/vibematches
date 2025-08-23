package repository

import (
	"database/sql"
)

func ResetProfilesTable(db *sql.DB) error {
	_, err := db.Exec(`DROP TABLE IF EXISTS profiles`)
	if err != nil {
		return err
	}
	_, err = db.Exec(`CREATE TABLE profiles (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT,
		age INTEGER,
		image TEXT
	)`)
	return err
}

func ResetAndSeedProfiles(db *sql.DB) error {
	if err := ResetProfilesTable(db); err != nil {
		return err
	}
	return SeedProfiles(db)
}
