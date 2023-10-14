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
	// ユーザーのプロフィールの初期化
	profile := models.UserProfile{UserID: user.ID}
	user.Profile = profile
	if err := database.DB.Create(&profile).Error; err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}
	c.JSON(200, gin.H{"user": user})
}

// ユーザーを更新
type UpdateUserInput struct {
	Email string `json:"email"`
	Password string `json:"password"`
	PasswordConfirmation string `json:"password_confirmation"`
}

func UpdateUser(c *gin.Context) {
	var input UpdateUserInput
	userId := c.Param("id")

	// ユーザーの取得
	var user models.User
	if err := database.DB.First(&user, "id = ?", userId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "User not found"})
		} else {
			c.JSON(500, gin.H{"error": "Failed to retrieve user"})
		}
		return
	}

	// ユーザーの更新
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err})
		return
	}
	if input.Email != "" {
		user.Email = input.Email
	}
	if input.Password != "" {
		if input.Password != input.PasswordConfirmation {
			c.JSON(400, gin.H{"error": "Password does not match confirmation"})
			return
		}
		user.RawPassword = input.Password
	}
	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}

	c.JSON(200, gin.H{"user": user})
}

// ユーザーを削除
func DeleteUser(c *gin.Context) {
	userId := c.Param("id")

	// ユーザーの取得
	var user models.User
	if err := database.DB.First(&user, "id = ?", userId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "User not found"})
		} else {
			c.JSON(500, gin.H{"error": "Failed to retrieve user"})
		}
		return
	}

	// ユーザーの削除
	if err := database.DB.Delete(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}

	c.JSON(200, gin.H{"message": "User deleted"})
}

// ユーザーのプロフィールを更新
type UpdateUserProfileInput struct {
	name string `json:"name"`
	profile_icon_url string `json:"profile_icon_url"`
	school_name string `json:"school_name"`
	major string `json:"major"`
	student_type string `json:"student_type"`
	year int64 `json:"year"`
	introduction string `json:"introduction"`
}

func UpdateUserProfile(c *gin.Context) {
	var input UpdateUserProfileInput
	userId := c.Param("id")

	// ユーザーの取得
	var user models.User
	if err := database.DB.First(&user, "id = ?", userId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "User not found"})
		} else {
			c.JSON(500, gin.H{"error": "Failed to retrieve user"})
		}
		return
	}

	// ユーザーのプロフィールの取得
	var profile models.UserProfile
	if err := database.DB.Where("user_id = ?", user.ID).First(&profile).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "Profile not found"})
		} else {
			c.JSON(500, gin.H{"error": "Failed to retrieve profile"})
		}
		return
	}

	// ユーザーのプロフィールの更新
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err})
		return
	}

	if input.name != "" {
		profile.Name = input.name
	}
	if input.profile_icon_url != "" {
		profile.ProfileIconURL = &input.profile_icon_url
	}
	if input.school_name != "" {
		profile.SchoolName = &input.school_name
	}
	if input.major != "" {
		profile.Major = &input.major
	}
	if input.student_type != "" {
		profile.StudentType = &input.student_type
	}
	if input.year != 0 {
		profile.Year = &input.year
	}
	if input.introduction != "" {
		profile.IntroduceText = &input.introduction
	}

	if err := database.DB.Save(&profile).Error; err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}

	c.JSON(200, gin.H{"profile": profile})
}
