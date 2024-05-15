package router

import (
	"net/http"

	"github.com/gabjc/Advanced-To-Do/server/middleware"
)

func LoadRouter() http.Handler {
	mux := http.NewServeMux()
	handler := &middleware.Handler{}

	mux.HandleFunc("POST /users", handler.CreateUser)
	mux.HandleFunc("POST /{user}/task/{id}", handler.CreateTask)

	return mux
}
