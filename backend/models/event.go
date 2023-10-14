package models

type Event struct {

	EventId				int64 		`gorm:"primaryKey;not null" json:"event_id"`
	User 				User 		`gorm:"foreignKey:UserId" json:"user_id"`
	Category 			Category 	`gorm:"foreignKey:CategoryId" json:"category_id"`
	Language 			[]Language 	`gorm:"foreignKey:LanguageId" json:"language_id"`
	Tag 				[]Tag 		`gorm:"foreignKey:TagId" json:"tag_id"`
	EventImage 			string  	`json:"event_image"`
	EventTitle 			string		`json:"event_title"`
	EventDescription 	string		`json:"event_description"`
	MaxParticipants 	int64		`json:"max_participants"`
	Venue 				string		`json:"venue"`
	Address 			string		`json:"address"`
	EventDatetime 		string		`json:"event_datetime"`
	IsOnline 			bool		`json:"is_online"`
}

type Category struct{
	CategoryId 		int64	`gorm:"primaryKey;not null" json:"category_id"`
	CategoryName 	string	`json:"category_name"`
}

type Language struct {
	LanguageId 		int64	`gorm:"primaryKey;not null" json:"language_id"`
	LanguageText 	string	`json:"language_text"`
}

type Tag struct {
	TagId 	int64 	`gorm:"primaryKey;not null" json:"tag_id"`
	TagText string	`json:"tag_text"`
}

// 仮作成
type User struct {
	UserId int64	`gorm:"primaryKey;" json:"user_user"`
}