package database

import (
	"matcher_api/models"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	if err := db.AutoMigrate(
		&models.User{},
		&models.UserProfile{},
		&models.Notification{},
		&models.NotificationType{},
		&models.Event{},
		&models.Category{},
		&models.Language{},
		&models.Tag{},
	); err != nil {
		return err
	}
	return nil
}

func Drop(db *gorm.DB) error {
	if err := db.Migrator().DropTable(
		&models.User{},
		&models.UserProfile{},
		&models.Notification{},
		&models.NotificationType{},
		&models.Event{},
		&models.Category{},
		&models.Language{},
		&models.Tag{},
	); err != nil {
		return err
	}
	return nil
}

func Create(db *gorm.DB) error {
	if err := db.Migrator().CreateTable(
		&models.User{},
		&models.UserProfile{},
		&models.Notification{},
		&models.NotificationType{},
		&models.Event{},
		&models.Category{},
		&models.Language{},
		&models.Tag{},
	); err != nil {
		return err
	}
	return nil
}

func Reset(db *gorm.DB) error {
	if err := Drop(db); err != nil {
		return err
	}
	if err := Create(db); err != nil {
		return err
	}
	return Migrate(db)
}
