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

	// event
	r.GET("/events", controllers.CreateEvent)
	r.GET("/events/:event_id", controllers.GetEventDetails)
	r.POST("/events", controllers.CreateEvent)
	r.PUT("/events/:event_id", controllers.UpdateEvent)
	r.DELETE("/events/:event_id", controllers.DeleteEvent)

	// language
	r.GET("/languages", controllers.GetAllLanguages)
	r.GET("/languages/:language_id", controllers.GetLanguageDetails)

	// tag
	r.GET("/tags", controllers.GetAllTags)
	r.GET("/tags/:tag_id", controllers.GetTagDetails)

	// category
	r.GET("/categories", controllers.GetAllCategories)
	r.GET("/categories/:category_id", controllers.GetCategoryDetails)

	return r
}
