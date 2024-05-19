package Models

//TODO: replace ListofTasks with pointers to Task objects
type User struct {
	UserID      int64  `json:"userID"`
	Username    string `json:"username"`
	Password    string `json:"password"`
	Email       string `json:"email"`
	LastLogin   string `json:"last"`
	ListofTasks []Task `json:"tasks"`
}

/*
Constructor Function for User
*/
func NewUser(userID int64, username string, password string, email string, lastLogin string) *User {
	return &User{
		UserID:      userID,
		Username:    username,
		Password:    password,
		Email:       email,
		LastLogin:   lastLogin,
		ListofTasks: []Task{},
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

/*
Editing Task List Functions for User
-Add Task: AddTask(task Task)
-Remove Task: RemoveTask(task Task)
-Get Task: GetTask(taskID int64)
-Get Tasks: GetTasks()
-Update Task: UpdateTask(task Task)
*/

func (u *User) AddTask(task Task) {
	u.ListofTasks = append(u.ListofTasks, task)
}

func (u *User) RemoveTask(task Task) {
	for i, t := range u.ListofTasks {
		if t.getTaskID() == task.getTaskID() {
			u.ListofTasks = append(u.ListofTasks[:i], u.ListofTasks[i+1:]...)
			break
		}
	}
}

func (u *User) GetTask(taskID int64) Task {
	for _, t := range u.ListofTasks {
		if t.getTaskID() == taskID {
			return t
		}
	}
	return Task{}
}

func (u *User) GetTasks() []Task {
	return u.ListofTasks
}

func (u *User) UpdateTask(task Task) {
	for i, t := range u.ListofTasks {
		if t.getTaskID() == task.getTaskID() {
			u.ListofTasks[i] = task
			break
		}
	}
}
