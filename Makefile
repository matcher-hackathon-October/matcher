# データベースのマイグレーション
migrate:
		docker-compose exec backend go run -tags tool migration_tool.go -migrate

# テーブルのドロップ
drop:
		docker-compose exec backend go run -tags tool migration_tool.go -drop

# データベースのリセット
reset:
		docker-compose exec backend go run -tags tool migration.go -reset

# seedデータの投入
seed:
		docker-compose exec backend go run -tags tool seed_tool.go

.PHONY: migrate drop reset