package routes

import (
	"matcher_api/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// ユーザー
	r.GET("/users", controllers.GetAllUsers)
	r.GET("/users/:id", controllers.GetUserAndProfile)
	r.POST("/users", controllers.CreateUser)
	r.PUT("/users/:id", controllers.UpdateUser)
	r.DELETE("/users/:id", controllers.DeleteUser)
	r.PATCH("/users/:id/profile", controllers.UpdateUserProfile)

	// イベント
	r.GET("/events", controllers.GetEvents)
	r.GET("/events/:id", controllers.GetEventDetails)
	r.POST("/events", controllers.CreateEvent)
	r.PUT("/events/:id", controllers.UpdateEvent)
	r.DELETE("/events/:id", controllers.DeleteEvent)

	// カテゴリ
	r.GET("/categories", controllers.GetAllCategories)

	// 言語
	r.GET("/languages", controllers.GetAllLanguages)

	// タグ
	r.GET("/tags", controllers.GetAllTags)

	return r
}
