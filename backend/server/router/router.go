package router

import (
	"net/http"

	"github.com/gabjc/Advanced-To-Do/server/middleware"
)

func router() {
	r := http.NewServeMux()

	r.HandleFunc("POST /users", middleware.CreateUser)
	// r.HandleFunc("POST /users", func(w http.ResponseWriter, r *http.Request) {
	// 	w.Write([]byte("Created a new User"))
	// })

	// r.HandleFunc("POST /{user}/task/{id}", func(w http.ResponseWriter, r *http.Request) {
	// 	taskID := r.PathValue("id")
	// 	fmt.Fprintf(w, "Task ID: %s", taskID)
	// })
}
