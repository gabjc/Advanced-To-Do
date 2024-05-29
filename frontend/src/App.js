import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import AssignmentView from './pages/taskInfo/AssignmentView';
import TopNavBar from './components/topNavBar/TopNavBar';
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:taskId" element={<AssignmentView />} />
      </Routes>
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
