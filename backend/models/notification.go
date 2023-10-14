package models

import (
	"gorm.io/gorm"
)

type Notification struct {
	gorm.Model
	Content            string             `json:"content"` // 通知の内容
	UserID             uint               `json:"user_id"` // 通知を受け取るユーザーのID
	User               User               `json:"user" gorm:"foreignKey:UserID"` // 通知を受け取るユーザー
	NotificationTypeID uint               `json:"notification_type_id"` // 通知のタイプのID
	Type               NotificationType   `json:"type" gorm:"foreignKey:NotificationTypeID"`    // 通知のタイプ
}
