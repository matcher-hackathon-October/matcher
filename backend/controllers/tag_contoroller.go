package controllers

import (
	"gorm.io/gorm"
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
	c.JSON(200, gin.H{"events": tags})
}

//　タグの詳細を取得
func GetTagDetails(c *gin.Context) {
	var tag models.Tag
	tagId := c.Param("tag_id")

	if err := database.DB.Find(&tag, tagId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "Record not found"})
		} else {
			c.JSON(500, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(200, gin.H{"tag": tag})
}
