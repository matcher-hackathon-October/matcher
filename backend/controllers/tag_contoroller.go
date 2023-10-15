package controllers

import (
	"matcher_api/models"
	"matcher_api/db"
	"github.com/gin-gonic/gin"
)

// 全てのtag情報を取得
func GetAllTags(c *gin.Context) {
	var tags []models.Tag

	if err := database.DB.Find(&tags).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	// レスポンスをJSONとして返す
	c.JSON(200, gin.H{"tags": tags})
}
