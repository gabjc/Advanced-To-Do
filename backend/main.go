package main

import (
	"log"
	"net/http"

	"github.com/gabjc/Advanced-To-Do/backend/server/middleware"
	"github.com/gabjc/Advanced-To-Do/backend/server/router"
)

func main() {
	r := router.LoadRouter()
	middleware.StartDatabase()

	server := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	log.Println("Starting server on port 8080...")
	log.Fatal(server.ListenAndServe())
}
