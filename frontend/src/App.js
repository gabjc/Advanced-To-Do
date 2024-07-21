import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import AssignmentView from './pages/taskInfo/AssignmentView';
import TopNavBar from './components/topNavBar/TopNavBar';
import CreateTask from './pages/create/CreateTask';
import SignIn from './pages/sign-in/SignIn';
import Register from './pages/register/Register';
import TaskTimer from './pages/taskTimer/TaskTimer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from "react-dom/client";

const App = () => {
    const task = {
    name: 'Task 1',
    description: 'This is task 1',
    personalNotes: 'This is my personal note',
    startDate: '05-01',
    endDate: '05-02'
  };
  return (
    <BrowserRouter>
      <TopNavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:taskId" element={<AssignmentView />} />
          <Route path="/create" element={<CreateTask/>} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task/:taskId/timer" element={<TaskTimer/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

// function App() {
//   const task = {
//     name: 'Task 1',
//     description: 'This is task 1',
//     personalNotes: 'This is my personal note',
//     startDate: '05-01',
//     endDate: '05-02'
//   };
//   return (
//     <div>
//       <TopNavBar />
//       <AssignmentView task={task} />
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
