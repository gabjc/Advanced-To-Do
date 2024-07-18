package router

import (
	"net/http"

	"github.com/gabjc/Advanced-To-Do/backend/server/middleware"
)

func LoadRouter() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /register", middleware.CreateUser())
	mux.HandleFunc("GET /home/{userID}", middleware.GetAllTasks())
	mux.HandleFunc("GET /{userID}/{id}", middleware.GetTaskByID())
	mux.HandleFunc("POST /{userID}/create-task", middleware.CreateTask())
	mux.HandleFunc("DELETE /{userID}/delete-task/{id}", middleware.DeleteTask())
	mux.HandleFunc("GET /{userID}/edit-task/{id}/", middleware.GetTaskByID())
	// mux.HandleFunc("PUT /{userID}/edit-task/{id}", middleware.EditTask())

	return mux
}
