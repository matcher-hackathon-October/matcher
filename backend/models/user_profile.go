package models

import (
	"gorm.io/gorm"
)

type UserProfile struct {
	gorm.Model
	IntroduceText  string `gorm:"size:1000" json:"introduce_text,omitempty"`  // サイズ制限
	Major          string `gorm:"size:255" json:"major,omitempty"`            // サイズ制限
	Name           string  `gorm:"size:255;not null" json:"name"`              // サイズ制限、ヌル制約
	ProfileIconURL string `gorm:"size:500" json:"profile_icon_url,omitempty"` // サイズ制限 (URLの場合、長さが必要かもしれません)
	SchoolName     string `gorm:"size:255" json:"school_name,omitempty"`      // サイズ制限
	StudentType    string `gorm:"size:100" json:"student_type,omitempty"`     // サイズ制限
	Year           int64  `json:"year,omitempty"`
	UserID         uint    `gorm:"index;unique" json:"user_id"`
}
