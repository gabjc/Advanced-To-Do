package router

import (
	"net/http"

	"github.com/gabjc/Advanced-To-Do/backend/server/middleware"
)

func LoadRouter() http.Handler {
	mux := http.NewServeMux()
	handler := &middleware.Handler{}

	mux.HandleFunc("POST /users", handler.CreateUser)
	mux.HandleFunc("GET /home/{user}", handler.GetAllTasks)
	mux.HandleFunc("GET /{user}/task/{id}", handler.GetTaskByID)
	mux.HandleFunc("POST /{user}/task", handler.CreateTask)
	mux.HandleFunc("DELETE /{user}/delete-task/{id}", handler.DeleteTask)
	mux.HandleFunc("PUT /{user}/edit-task/{id}", handler.EditTask)

	return mux
}
