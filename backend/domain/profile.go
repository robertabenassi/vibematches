package domain

type Profile struct {
	ID    int    `json:"id" db:"id"`
	Name  string `json:"name" db:"name"`
	Image string `json:"image" db:"image"`
	Age   int    `json:"age" db:"age"`
}
