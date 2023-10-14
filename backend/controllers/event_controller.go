package controllers

import (
	"gorm.io/gorm"
	"matcher_api/models"
	"matcher_api/db"
	"github.com/gin-gonic/gin"
)

// 全てのイベントを取得
func GetAllEvents(c *gin.Context) {
	var events []models.Event
	if err := database.DB.Find(&events).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	// レスポンスをJSONとして返す
	c.JSON(200, gin.H{"events": events})
}

// イベントの詳細を取得
func GetEventDetails(c *gin.Context) {
	var event models.Event
	eventId := c.Param("id")

	if err := database.DB.Find(&event, eventId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "Record not found"})
		} else {
			c.JSON(500, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(200, gin.H{"event": event})
}

//　イベントの作成
func CreateEvent(c *gin.Context) {
	var event models.Event

	if err := c.ShouldBindJSON(&event); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// データベースにイベントを保存
	result := database.DB.Create(&event)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create event"})
		return
	}

	c.JSON(200, gin.H{"event": event})
}

// イベント情報の更新
func UpdateEvent(c *gin.Context) {
    eventID := c.Param("id")

	// イベント情報の取得
    var event models.Event
    if err := database.DB.First(&event, eventID).Error; err != nil {
        c.JSON(404, gin.H{"error": "Event not found"})
        return
    }

    // 新しいイベント情報をリクエストから取得
    var updatedEvent models.Event
    if err := c.ShouldBindJSON(&updatedEvent); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    // イベント情報を更新
    event.EventTitle = updatedEvent.EventTitle
	event.EventDescription = updatedEvent.EventDescription
	event.MaxParticipants = updatedEvent.MaxParticipants
	event.Venue = updatedEvent.Venue
	event.Address = updatedEvent.Address
	event.EventDatetime = updatedEvent.EventDatetime
	event.IsOnline = updatedEvent.IsOnline
	event.Languages = updatedEvent.Languages
	event.Tags = updatedEvent.Tags

    // データベースにイベントを保存
    if err := database.DB.Save(&event).Error; err != nil {
        c.JSON(500, gin.H{"error": "Failed to update event"})
        return
    }

    c.JSON(200, gin.H{"event": event})
}


func DeleteEvent(c *gin.Context) {
	var event models.Event
	eventId := c.Param("id")

	if err := database.DB.Find(&event, eventId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "Record not found"})
		} else {
			c.JSON(500, gin.H{"error": err.Error()})
		}
		return
	}

	if err := database.DB.Delete(&event, eventId).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "Event deleted successfully"})
}