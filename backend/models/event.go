package models

import (
	"gorm.io/gorm"
	"time"
)

type Event struct {
	gorm.Model
	Users               []User      `gorm:"many2many:user_events;"`
	CategoryId          uint        `gorm:"not null;index" json:"category_id"`
	Category            Category    `gorm:"foreignKey:CategoryId;"`
	Languages           []Language  `gorm:"many2many:event_languages;" json:"languages"`
	Tags                []Tag       `gorm:"many2many:event_tags;" json:"tags"`
	EventImage          string      `gorm:"size:255" json:"event_image"` // 例: 画像のURLの長さを255に制限
	EventTitle          string      `gorm:"size:255;not null" json:"event_title"` // タイトルは必須
	EventDescription    string      `gorm:"type:text" json:"event_description"` // これは長いテキストを想定しています
	MaxParticipants     uint        `json:"max_participants"`
	Venue               string      `gorm:"size:255" json:"venue"`
	Address             string      `gorm:"size:255" json:"address"`
	EventDatetime       time.Time   `json:"event_datetime"`
	IsOnline            bool        `json:"is_online"`
}

type Category struct {
	gorm.Model
	CategoryName        string      `gorm:"size:255;not null;unique" json:"category_name"` // カテゴリ名は必須で、ユニーク
}

type Language struct {
	gorm.Model
	LanguageName        string      `gorm:"size:255;not null;unique" json:"language_text"` // 言語名は必須で、ユニーク
}

type Tag struct {
	gorm.Model
	TagName             string      `gorm:"size:255;not null;unique" json:"tag_text"` // タグ名は必須で、ユニーク
}
