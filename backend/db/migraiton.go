package migration

import (
	"flag"
	"fmt"
	"os"
	"log"
	"time"

	- "github.com/go-sql-driver/postgres"
	"github.com/golang-migrate/migrate/v4"
	- "github.com/golang-migrate/migrate/v4/database/postgres"
	- "github.com/golang-migrate/migrate/v4/source/file"
	- "github.com/jinzhu/gorm"
)