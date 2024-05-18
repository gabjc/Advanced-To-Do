package Models

type User struct {
	UserID    int64  `json:"userID"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Email     string `json:"email"`
	LastLogin string `json:"last"`
}

/*
Constructor Function for User
*/
func NewUser(userID int64, username string, password string, email string, lastLogin string) *User {
	return &User{
		UserID:    userID,
		Username:  username,
		Password:  password,
		Email:     email,
		LastLogin: lastLogin,
	}
}

/*
Getter Functions for User
-User ID: getUserID()
-Username: getUsername()
-Password: getPassword()
-Email: getEmail()
-Last Login: getLastLogin()
*/
func (u *User) GetUserID() int64 {
	return u.UserID
}

func (u *User) GetUsername() string {
	return u.Username
}

func (u *User) GetPassword() string {
	return u.Password
}

func (u *User) GetEmail() string {
	return u.Email
}

func (u *User) GetLastLogin() string {
	return u.LastLogin
}

/*
	Setter Functions for User

-Username: setUsername(username string)
-Password: setPassword(password string)
-Email: setEmail(email string)
-Last Login: setLastLogin(lastLogin string)
*/
func (u *User) SetUsername(username string) {
	u.Username = username
}

func (u *User) SetPassword(password string) {
	u.Password = password
}

func (u *User) SetEmail(email string) {
	u.Email = email
}

func (u *User) SetLastLogin(lastLogin string) {
	u.LastLogin = lastLogin
}
