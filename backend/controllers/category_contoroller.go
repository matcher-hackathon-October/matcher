package controllers

import (
	"gorm.io/gorm"
	"matcher_api/models"
	"matcher_api/db"
	"github.com/gin-gonic/gin"
)

// 全てのtag情報を取得
func GetAllCategories(c *gin.Context) {
	var categories []models.Category

	if err := database.DB.Find(&categories).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	// レスポンスをJSONとして返す
	c.JSON(200, gin.H{"events": categories})
}

// イベントの詳細を取得
func GetCategoryDetails(c *gin.Context) {
	var category models.Tag
	categoryId := c.Param("category_id")

	if err := database.DB.Find(&category, categoryId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "Record not found"})
		} else {
			c.JSON(500, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(200, gin.H{"category": category})
}