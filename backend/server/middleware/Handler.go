package middleware

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/gabjc/Advanced-To-Do/backend/server/Models"
	"github.com/golang-jwt/jwt/v5"
)

var db *sql.DB

type Handler struct{}

func StartDatabase() {
	var err error
	connStr := ""
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
}

//Login

// Create the JWT key used to create the signature
var jwtKey = []byte("my_secret_key")

// For simplification, we're storing the users information as an in-memory map in our code
var users = map[string]string{
	"user1": "password1",
	"user2": "password2",
}

// Create a struct to read the username and password from the request body
type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

// Create a struct that will be encoded to a JWT.
// We add jwt.RegisteredClaims as an embedded type, to provide fields like expiry time
type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// Create the Signin handler
func Signin(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Get the expected password from our in memory map
	// Change this to parse database
	expectedPassword, ok := users[creds.Username]

	// If a password exists for the given user
	// AND, if it is the same as the password we received, the we can move ahead
	// if NOT, then we return an "Unauthorized" status
	if !ok || expectedPassword != creds.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Declare the expiration time of the token
	expirationTime := time.Now().Add(999999 * time.Hour)
	// Create the JWT claims, which includes the username and expiry time
	claims := &Claims{
		Username: creds.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Finally, we set the client cookie for "token" as the JWT we just generated
	// we also set an expiry time which is the same as the token itself
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
}

func CreateUser() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		w.Header().Set("Content-type", "application/x-www-form-urlencoded")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		var user []Models.User

		// Decode the JSON body
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = db.Exec("INSERT INTO users (userID, username, password, email) values ($1, $2, $3, $4)")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Return the created task as JSON
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
		w.WriteHeader(http.StatusCreated)
	}
}

func GetAllTasks() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

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

		// 	//Puts the tasks we just got into a list
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

		// Encode the task to JSON and write it to the response
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(tasks)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func GetTaskByID() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Extract the ID from the URL path
		taskID := r.PathValue("id")

		// Query database for the task with the given task_id
		var task Models.Task
		err := db.QueryRow("SELECT id, name, status, date_created, finish_date, notes FROM tasks WHERE id = $1", taskID).Scan(
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
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(task)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func CreateTask() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		w.Header().Set("Content-type", "application/x-www-form-urlencoded")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		var task []Models.Task

		// Decode the JSON body
		err := json.NewDecoder(r.Body).Decode(&task)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = db.Exec("INSERT INTO users (userID, username, password, email) values ($1, $2, $3, $4)")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Return the created task as JSON
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(task)
		w.WriteHeader(http.StatusCreated)
	}
}

func DeleteTask() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodDelete {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Extract the ID from the URL path
		idString := r.PathValue("id")
		id, err := strconv.Atoi(idString)
		if err != nil {
			http.Error(w, "Invalid task ID", http.StatusBadRequest)
			return
		}

		// Delete command
		result, err := db.Exec("DELETE FROM tasks WHERE id = $1", id)
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
		} else if rowsAffected > 0 {
			w.WriteHeader(http.StatusNoContent) // 204 No Content
			return
		}

		http.Error(w, "Task not found", http.StatusNotFound)
	}
}

// func (h *Handler) EditTask(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")

// 	//Getting the userID to compare to the tasks list from the URL query
// 	idStr := r.URL.Query().Get("id")
// 	taskID, err := strconv.ParseInt(idStr, 10, 64)
// 	if err != nil {
// 		http.Error(w, "Invalid task ID", http.StatusBadRequest)
// 		return
// 	}

// 	var editedTask Models.Task
// 	err = json.NewDecoder(r.Body).Decode(&editedTask)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	// Update the task in the database
// 	query := `
// 	UPDATE tasks
// 	SET name = $1, status = $2, finish_date = $3, notes = $4
// 	WHERE id = $5`
// 	_, err = db.Exec(query, editedTask.Name, editedTask.Status, editedTask.FinishDate, editedTask.Notes, taskID)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// Return status code 200
// 	w.WriteHeader(http.StatusOK)
// }
