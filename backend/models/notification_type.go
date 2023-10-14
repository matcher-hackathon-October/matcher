package models

type NotificationType struct {
	gorm.Model
	NotificationType string `gorm:"unique;not null" json:"notification_type"`
}
