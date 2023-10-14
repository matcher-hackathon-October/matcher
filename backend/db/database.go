package database

import (
	"log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"matcher_api/config"
)

// DB is database connection
var DB *gorm.DB

// ConnectDB is initialize database connection
func ConnectDB() error{
	dsn := config.GetDBConfig().GetDSN()
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}
	DB = db
	log.Println("Database connection successfully opened")
	return nil
}
