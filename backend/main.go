package main

import (
	"matcher_api/config"
	"matcher_api/routes"
)

func main() {
	// ルーターのセットアップ
	r := routes.SetupRouter()

	// サーバー起動
	r.Run(config.Port)
}
