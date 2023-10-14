# データベースのマイグレーション
migrate:
		docker-compose exec backend go run -tags tool migration_tool.go -migrate

# テーブルのドロップ
drop:
		docker-compose exec backend go run -tags tool migration_tool.go -drop

# データベースのリセット
reset:
		docker-compose exec backend go run -tags tool migration.go -reset

.PHONY: migrate drop reset