package models

// ドキュメントより
// gorm.Modelの定義
// type Model struct {
//   ID        uint           `gorm:"primaryKey"`
//   CreatedAt time.Time
//   UpdatedAt time.Time
//   DeletedAt gorm.DeletedAt `gorm:"index"`
// }

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email         string      `gorm:"size:255;uniqueIndex;not null" json:"email"`  // サイズ制限、ユニーク制約、ヌル制約
	PasswordHash  string      `gorm:"size:255;not null" json:"password_hash"`      // サイズ制限、ヌル制約
	ProfileID     uint        `json:"profile_id"`
	Profile       UserProfile `gorm:"foreignKey:ProfileID" json:"profile"`
	Events        []Event     `gorm:"many2many:user_events"`
	Notifications []Notification `gorm:"many2many:user_notifications"`
}
