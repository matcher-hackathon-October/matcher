package seeds

import (
	"time"
	"fmt"
	database "matcher_api/db"
	"matcher_api/models"
)

// createUsers is create users
func createUsers() {
	users := []models.User{
		{
			Email: "taro@example.com",
			RawPassword: "password",
			Profile: models.UserProfile{
				IntroduceText: "Hello, I'm Taro Yamada.",
				Major: "Computer Science",
				Name: "Taro Yamada",
				SchoolName: "Tokyo University",
				StudentType: "College",
				ProfileIconURL: "https://example.com/taro.jpg",
				Year: 3,
			},
		},
		{
			Email: "uesr2@example.com",
			RawPassword: "password",
			Profile: models.UserProfile{
				IntroduceText: "Hello, I'm Hanako Yamada.",
				Major: "Computer Science",
				Name: "Hanako Yamada",
				SchoolName: "Tokyo University",
				StudentType: "College",
				ProfileIconURL: "https://example.com/hanako.jpg",
				Year: 3,
			},
		},
	}

	for _, u := range users {
		if err := database.DB.Create(&u.Profile).Error; err != nil {
			fmt.Println("Error creating profile:", err)
			continue
		}
		u.ProfileID = u.Profile.ID
		if err := database.DB.Create(&u).Error; err != nil {
			fmt.Println("Error creating user:", err)
		}
	}
}

func createCategories() {
	categories := []models.Category{
		{
			CategoryName: "交流",
		},
		{
			CategoryName: "飲み会",
		},
		{
			CategoryName: "勉強会",
		},
	}

	for _, category := range categories {
		if err:= database.DB.Create(&category); err != nil {
			fmt.Println(err)
			continue
		}
	}
}

func createLanguages() {
	languages := []models.Language{
		{
			LanguageName: "日本語",
		},
		{
			LanguageName: "英語",
		},
		{
			LanguageName: "中国語",
		},
	}

	for _, language := range languages {
		if err:= database.DB.Create(&language); err != nil {
			fmt.Println(err)
			continue
		}
	}
}

func createTags() {
	tags := []models.Tag{
		{
			TagName: "大人数でワイワイ",
		},
		{
			TagName: "少人数でゆっくり",
		},
	}

	for _, tag := range tags {
		if err:= database.DB.Create(&tag); err != nil {
			fmt.Println(err)
			continue
		}
	}
}

func createEvents() {
	events := []models.Event{
		{
			CategoryId: 1,
			EventImage: "https://example.com/event1.jpg",
			EventTitle: "交流会",
			EventDescription: "交流会です。",
			MaxParticipants: 10,
			Venue: "東京",
			Address: "東京都",
			EventDatetime: time.Now().AddDate(0, 0, 1),
			IsOnline: false,
		},
		{
			CategoryId: 2,
			EventImage: "https://example.com/event2.jpg",
			EventTitle: "飲み会",
			EventDescription: "飲み会です。",
			MaxParticipants: 10,
			Venue: "東京",
			Address: "東京都",
			EventDatetime: time.Now().AddDate(0, 0, 2),
			IsOnline: false,
		},
	}

	for _, event := range events {
		if err:= database.DB.Create(&event); err != nil {
			fmt.Println(err)
			continue
		}
	}
}

// Run is execute seed
func Run() {
	database.ConnectDB()
	createUsers()
	createCategories()
	createLanguages()
	createTags()
	createEvents()
}
