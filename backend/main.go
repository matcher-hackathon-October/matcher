package main

import (
	"matcher_api/config"
	"matcher_api/middleware"
	"matcher_api/routes"
)

func main() {
	// ルーターのセットアップ
	r := routes.SetupRouter()

	// CORSミドルウェアを適用
	r.Use(middleware.CORSMiddleware())

	// サーバー起動
	r.Run(config.Port)
}
