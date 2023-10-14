package models

import (
	"gorm.io/gorm"
)

type Notification struct {
	gorm.Model
	Content            string             `gorm:"size:1000;not null" json:"content"` // サイズ制限、ヌル制約
	NotificationTypeID uint               `gorm:"not null" json:"notification_type_id"`
	Type               NotificationType   `json:"type" gorm:"foreignKey:NotificationTypeID"`
	Users              []User             `gorm:"many2many:user_notifications"`
}

