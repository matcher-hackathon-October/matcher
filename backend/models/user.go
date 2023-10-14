package models

// ドキュメントより
// gorm.Modelの定義
// type Model struct {
//   ID        uint           `gorm:"primaryKey"`
//   CreatedAt time.Time
//   UpdatedAt time.Time
//   DeletedAt gorm.DeletedAt `gorm:"index"`
// }

type User struct {
	gorm.Model
	Email         string      `gorm:"uniqueIndex;not null" json:"email"`
	PasswordHash  string      `gorm:"not null" json:"password_hash"`
	ProfileID     uint        `json:"profile_id"`
	Profile       UserProfile `gorm:"foreignKey:ProfileID" json:"profile"`
	EventID       uint        `json:"event_id"`       // EventのIDを参照する外部キー
	Event         Event       `gorm:"foreignKey:EventID" json:"event"`  // Eventとの関連性を示す
}
