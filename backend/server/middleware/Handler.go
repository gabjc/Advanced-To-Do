package middleware

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gabjc/Advanced-To-Do/backend/server/Models"
)

var db *sql.DB

type Handler struct{}

func StartDatabase() {
	var err error
	connStr := "host=db-instance-procrastination-app.cv6iyauy0wli.us-east-2.rds.amazonaws.com port=5432 user=username password=password dbname=db-instance-procrastination-app sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
}

// Used when registering a new user into the database server
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
}

// Used for home, just getting all the tasks to display on the home screen
func (h *Handler) GetAllTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//Getting the userID to compare to the tasks list from the URL query
	userIDStr := r.URL.Query().Get("user_id")
	userID, err := strconv.ParseInt(userIDStr, 10, 64)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	//gets the tasks from the database that contains the userID we are looking for
	rows, err := db.Query("SELECT id, name, status, date_created, finish_date, notes FROM tasks WHERE user_id = $1", userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	//Puts the tasks we just got into a list
	var tasks []Models.Task
	for rows.Next() {
		var task Models.Task
		err := rows.Scan(&task.ID, &task.Name, &task.Status, &task.DateCreated, &task.FinishDate, &task.Notes)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		tasks = append(tasks, task)
	}

	if err = rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//Encode the task list to JSON and write it to the response
	err = json.NewEncoder(w).Encode(tasks)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

// Used for inspecting a task or for editing a task
func (h *Handler) GetSpecificTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//Getting the userID to compare to the tasks list from the URL query
	idStr := r.URL.Query().Get("id")
	taskID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	// Query database for the task with the given task_id
	var task Models.Task
	err = db.QueryRow("SELECT id, name, status, date_created, finish_date, notes FROM tasks WHERE id = $1", taskID).Scan(
		&task.ID, &task.Name, &task.Status, &task.DateCreated, &task.FinishDate, &task.Notes)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Task not found", http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Encode the task to JSON and write it to the response
	err = json.NewEncoder(w).Encode(task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (h *Handler) CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodPost {
		var task Models.Task
		err := json.NewDecoder(r.Body).Decode(&task)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = db.Exec("INSERT INTO tasks (id, name, status, date_created, finish_date, notes, user_id) values (?, ?, ?, ?, ?, ?, ?)")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func (h *Handler) DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//Getting the userID to compare to the tasks list from the URL query
	idStr := r.URL.Query().Get("id")
	taskID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	// Delete command
	result, err := db.Exec("DELETE FROM tasks WHERE id = $1", taskID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Check how many rows were affected
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}

	// Return a success message
	w.WriteHeader(http.StatusNoContent)
}

func (h *Handler) EditTask(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) CompleteTask(w http.ResponseWriter, r *http.Request) {

}
