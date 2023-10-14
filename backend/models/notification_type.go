package models

import (
	"gorm.io/gorm"
)

type NotificationType struct {
	gorm.Model
	NotificationType string `gorm:"size:255;unique;not null" json:"notification_type"`  // サイズ制限、ユニーク制約、ヌル制約
}

