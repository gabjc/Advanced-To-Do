package Handler

import (
	"net/http"
)

type Handler struct{}

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) GetAllTasks(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) CreateTask(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) DeleteTask(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) CompleteTask(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) EditTask(w http.ResponseWriter, r *http.Request) {

}
