package config

import "os"
import "fmt"

const Port = ":8080"

// DBConfig is database configuration
type DBConfig struct {
	Host	 string
	Port	 string
	User	 string
	Password string
	DBName	 string
	SSLMode	 string
	TimeZone string
}

// GetDBConfig is get database configuration
func GetDBConfig() *DBConfig {
	return &DBConfig{
		Host:	 os.Getenv("DB_HOST"),
		Port:	 os.Getenv("DB_PORT"),
		User:	 os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName:	 os.Getenv("DB_NAME"),
		SSLMode:	 os.Getenv("DB_SSL_MODE"),
		TimeZone: os.Getenv("DB_TIMEZONE"),
	}
}

//　DSNを生成する関数
func (dc *DBConfig) GetDSN() string {
	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s TimeZone=%s",
		dc.Host, dc.Port, dc.User, dc.Password, dc.DBName, dc.SSLMode, dc.TimeZone,
	)
}
