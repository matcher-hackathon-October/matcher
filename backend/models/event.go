package models

type Event struct {
	EventId				int64 		`gorm:"primaryKey;not null;" json:"event_id"`
	UserId				int64 		`json:"user_id"`
	User 				User 		`gorm:"foreignKey:UserId;"`
	CategoryId			int64		`json:"category_id"`
	Category 			Category 	`gorm:"foreignKey:CategoryId;"`
	Languages 			[]Language 	`gorm:"many2many:event_languages;" json:"languages"`
	Tags 				[]Tag 		`gorm:"many2many:event_tags;" json:"tags"`
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
	CategoryId 		int64	`gorm:"primaryKey;not null;" json:"category_id"`
	CategoryName 	string	`json:"category_name"`
}

type Language struct {
	LanguageId 		int64	`gorm:"primaryKey;not null;" json:"language_id"`
	LanguageText 	string	`json:"language_text"`
}

type Tag struct {
	TagId 	int64 	`gorm:"primaryKey;not null;" json:"tag_id"`
	TagText string	`json:"tag_text"`
}