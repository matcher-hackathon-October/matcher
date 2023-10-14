package models

import (
	"gorm.io/gorm"
)

type HelloWorld struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
