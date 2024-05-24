package middleware

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gabjc/Advanced-To-Do/backend/server/Models"
)

var db *sql.DB

type Handler struct{}

func startDatabase() {
	var err error
	db, err = sql.Open("mysql", "username:password@tcp(db-instance-procrastination-app.cv6iyauy0wli.us-east-2.rds.amazonaws.com)/db-instance-procrastination-app")
	if err != nil {
		panic(err)
	}
}

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	
	if r.Method == http.MethodPost {
		var user Models.User
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		
		_, err = db.Exec("INSERT INTO users (userID, username, password, email) values (?, ?, ?, ?)")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

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

	if r.Method == http.MethodPost {
		var task Models.Task
		err := 	json.NewDecoder(r.Body).Decode(&task)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		
		_, err = db.Exec("INSERT INTO ")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}



}

func (h *Handler) DeleteTask(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) CompleteTask(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) EditTask(w http.ResponseWriter, r *http.Request) {

}
