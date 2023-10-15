package controllers

import (
	"gorm.io/gorm"
	"matcher_api/models"
	"matcher_api/db"
	"github.com/gin-gonic/gin"
)

// 全ての言語情報を取得
func GetAllLanguages(c *gin.Context) {
	var languages []models.Language

	if err := database.DB.Find(&languages).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	// レスポンスをJSONとして返す
	c.JSON(200, gin.H{"events": languages})
}

// 言語の詳細を取得
func GetLanguageDetails(c *gin.Context) {
	var language models.Language
	languageId := c.Param("language_id")

	if err := database.DB.Find(&language, languageId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "Record not found"})
		} else {
			c.JSON(500, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(200, gin.H{"language": language})
}
