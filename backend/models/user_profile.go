package models

type UserProfile struct {
	gorm.Model
	IntroduceText  *string `json:"introduce_text,omitempty"`
	Major          *string `json:"major,omitempty"`
	Name           string  `gorm:"not null" json:"name"`
	ProfileIconURL *string `json:"profile_icon_url,omitempty"`
	SchoolName     *string `json:"school_name,omitempty"`
	StudentType    *string `json:"student_type,omitempty"`
	Year           *int64  `json:"year,omitempty"`
	UserID         uint    `gorm:"index;unique" json:"user_id"` // Userテーブルとの外部キー
}
