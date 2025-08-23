package infrastructure

import (
	"database/sql"
	_ "modernc.org/sqlite"
)

func NewDB(dataSourceName string) (*sql.DB, error) {
	return sql.Open("sqlite", dataSourceName)
}
