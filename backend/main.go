package main

import (
	"log"
	"matcher_api/config"
	"matcher_api/middleware"
	"matcher_api/routes"
	"matcher_api/db"
)

func main() {
	// ルーターのセットアップ
	r := routes.SetupRouter()

	// CORSミドルウェアを適用
	r.Use(middleware.CORSMiddleware())

	// DB接続
	err := database.ConnectDB()
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}
	// サーバー起動
	r.Run(config.Port)
}
