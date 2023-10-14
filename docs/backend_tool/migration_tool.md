# Migration Tool の使い方

このツールは、データベースのマイグレーション、テーブルのドロップ、データベースのリセットを行うための CLI ツールです。

```bash
# データベースのマイグレーション
$ go run migration_tool.go -migrate
# 出力: Migration completed!

# テーブルのドロップ
$ go run migration_tool.go -drop
# 出力: Dropped tables!

# データベースのリセット
$ go run migration.go -reset
# 出力: Database reset completed!
```
