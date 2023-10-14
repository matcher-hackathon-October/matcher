package controllers

import (
	"gorm.io/gorm"
	"github.com/gin-gonic/gin"
	"matcher_api/models"
	"matcher_api/db"
)

// すべてのユーザーを取得
func GetAllUsers(c *gin.Context) {
	var users []models.User
	if err := database.DB.Find(&users).Error; err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}
	c.JSON(200, gin.H{"users": users})
}

// ユーザーとプロフィールを取得
func GetUserAndProfile(c *gin.Context) {
	var user models.User
	var profile models.UserProfile
	userId := c.Param("id")

	// ユーザーの取得
	if err := database.DB.First(&user, "id = ?", userId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "User not found"})
		} else {
			c.JSON(500, gin.H{"error": "Failed to retrieve user"})
		}
		return
	}

	// ユーザーのプロフィール取得
	if err := database.DB.Where("user_id = ?", user.ID).First(&profile).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "Profile not found"})
		} else {
			c.JSON(500, gin.H{"error": "Failed to retrieve profile"})
		}
		return
	}

	c.JSON(200, gin.H{"user": user, "profile": profile})
}

// ユーザーを作成
type CreateUserInput struct {
	Email string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	PasswordConfirmation string `json:"password_confirmation" binding:"required"`
}

func CreateUser(c *gin.Context) {
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err})
		return
	}

	// パスワードの確認
	if input.Password != input.PasswordConfirmation {
		c.JSON(400, gin.H{"error": "Password does not match confirmation"})
		return
	}

	// ユーザーの作成
	user := models.User{Email: input.Email, RawPassword: input.Password}
	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}

	c.JSON(200, gin.H{"user": user})
}



