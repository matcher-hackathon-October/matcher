// +build tool

package main

import (
	"matcher_api/db/seeds"
)

func main() {
	seeds.Run()
}