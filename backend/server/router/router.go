package router

import (
	"net/http"

	"github.com/gabjc/Advanced-To-Do/backend/server/middleware"
)

func LoadRouter() http.Handler {
	mux := http.NewServeMux()
	handler := &middleware.Handler{}

	mux.HandleFunc("POST /register", handler.CreateUser)
	mux.HandleFunc("GET /home/{userID}", handler.GetAllTasks)
	mux.HandleFunc("GET /{userID}/{id}", handler.GetSpecificTask)
	mux.HandleFunc("POST /{userID}/create-task", handler.CreateTask)
	mux.HandleFunc("DELETE /{userID}/delete-task/{id}", handler.DeleteTask)
	mux.HandleFunc("GET /{userID}/edit-task/{id}/", handler.GetSpecificTask)
	mux.HandleFunc("PUT /{userID}/edit-task/{id}", handler.EditTask)

	return mux
}
