package Models

type Task struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Status      string `json:"status"`
	DateCreated string `json:"date_created"`
	FinishDate  string `json:"finish_date"`
	Notes       string `json:"notes"`
}
