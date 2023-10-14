// +build tool

package main

import (
	"flag"
	"log"
	"matcher_api/db"
)

func main() {
	// コマンドライン引数を取得
	migrateFlag := flag.Bool("migrate", false, "Run DB migration")
	dropFlag := flag.Bool("drop", false, "Drop DB")
	resetFlag := flag.Bool("reset", false, "Reset DB")
	flag.Parse()

	err := database.ConnectDB() // 返り値を1つのみ受け取る
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}

	if *migrateFlag {
		if err := database.Migrate(database.DB); err != nil { // database.DBを使って呼び出す
			log.Fatalf("Error during migration: %v", err)
		}
		log.Println("Migration completed!")
		return
	}

	if *dropFlag {
		if err := database.Drop(database.DB); err != nil { // database.DBを使って呼び出す
			log.Fatalf("Error during dropping tables: %v", err)
		}
		log.Println("Dropped tables!")
		return
	}

	if *resetFlag {
		if err := database.Reset(database.DB); err != nil { // database.DBを使って呼び出す
			log.Fatalf("Error during reset: %v", err)
		}
		log.Println("Database reset completed!")
		return
	}
}
