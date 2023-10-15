package controllers

import (
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
	c.JSON(200, gin.H{"languages": languages})
}