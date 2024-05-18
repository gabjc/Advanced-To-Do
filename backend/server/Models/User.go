package Models

type User struct {
	UserID    int64  `json:"userID"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Email     string `json:"email"`
	LastLogin string `json:"last"`
}
