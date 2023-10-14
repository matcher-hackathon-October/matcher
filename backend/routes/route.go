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

	return r
}
