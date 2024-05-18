package middleware

import (
	"encoding/json"
	"net/http"

	"github.com/gabjc/Advanced-To-Do/backend/server/Models"
)

type Handler struct{}

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var user Models.User

	json.NewDecoder(r.Body).Decode(&user)
}

func GetAllTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload :=
		json.NewEncoder(w).Encode(payload)
}

func (h *Handler) GetTaskByID(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var task Models.Task

	json.NewDecoder(r.Body).Decode(&task)
}

func (h *Handler) DeleteTask(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) CompleteTask(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) EditTask(w http.ResponseWriter, r *http.Request) {

}
