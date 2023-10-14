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
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email         string      `gorm:"size:255;uniqueIndex;not null" json:"email"`  // サイズ制限、ユニーク制約、ヌル制約
	PasswordHash  string      `gorm:"size:255;not null" json:"password_hash"`      // サイズ制限、ヌル制約
	RawPassword   string      `gorm:"-" json:"raw_password"`                       // パスワードはJSONに含めない
	ProfileID     *uint        `json:"profile_id"`
	Profile       UserProfile `gorm:"foreignKey:ProfileID" json:"profile"`
	Events        []Event     `gorm:"many2many:user_events"`
	Notifications []Notification `gorm:"many2many:user_notifications"`
}

func (u *User) HashPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.PasswordHash = string(hashedPassword)
	return nil
}

func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password))
	return err == nil
}

func (u *User) BeforeSave(tx *gorm.DB) error {
	if u.RawPassword != "" {
		if err := u.HashPassword(u.RawPassword); err != nil {
			return err
		}
		u.RawPassword = ""
	}
	return nil
}