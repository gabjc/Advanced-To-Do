package Models

type Task struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Status      string `json:"status"`
	DateCreated string `json:"date_created"`
	FinishDate  string `json:"finish_date"`
	Notes       string `json:"notes"`
	UserID      int64  `json:"user_id"` //For determining if a user owns this task

}

/*
Constructor Function for Task
*/
func NewTask(id int64, name string, status string, dateCreated string, finishDate string, notes string) *Task {
	return &Task{
		ID:          id,
		Name:        name,
		Status:      status,
		DateCreated: dateCreated,
		FinishDate:  finishDate,
		Notes:       notes,
	}
}

/*
Setter Functions for Task
-Name: setTaskName(name string)
-Status: setTaskStatus(status string)
-Finish Date: setTaskFinishDate(finishDate string)
-Notes: setTaskNotes(notes string)
*/

// Setter for Task Name
func (task *Task) setTaskName(name string) {
	task.Name = name
}

// Setter for Task Status
// TODO: Add enum for status: "Not Started", "In Progress", "Completed"
func (task *Task) setTaskStatus(status string) {
	task.Status = status
}

// Setter for Task Finish Date
// TODO: Parse date string to date object
func (task *Task) setTaskFinishDate(finishDate string) {
	task.FinishDate = finishDate
}

// Setter for Task Notes
// TODO: Add delete notes function
func (task *Task) setTaskNotes(notes string) {
	task.Notes = notes
}

/*
Getter Functions for Task
-Task ID: getTaskID()
-Name: getTaskName()
-Status: getTaskStatus()
-Date Created: getTaskDateCreated()
-Finish Date: getTaskFinishDate()
-Notes: getTaskNotes()
*/

// Getter for Task ID
func (task *Task) getTaskID() int64 {
	return task.ID
}

// Getter for Task Name
func (task *Task) getTaskName() string {
	return task.Name
}

// Getter for Task Status
func (task *Task) getTaskStatus() string {
	return task.Status
}

// Getter for Task Date Created
func (task *Task) getTaskDateCreated() string {
	return task.DateCreated
}

// Getter for Task Finish Date
func (task *Task) getTaskFinishDate() string {
	return task.FinishDate
}

// Getter for Task Notes
func (task *Task) getTaskNotes() string {
	return task.Notes
}
