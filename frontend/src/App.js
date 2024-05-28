import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import AssignmentView from './pages/taskInfo/AssignmentView';
import TopNavBar from './components/topNavBar/TopNavBar';
function App() {
  const task = {
    name: 'Task 1',
    description: 'This is task 1',
    personalNotes: 'This is my personal note',
    startDate: '05-01',
    endDate: '05-02'
  };
  return (
    <div>
      <TopNavBar />
      <AssignmentView task={task} />
    </div>
  );
}

export default App;
