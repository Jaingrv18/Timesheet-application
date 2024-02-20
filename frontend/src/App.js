//import logo from './logo.svg';
import './App.css';
import{BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EmployeeTimeSheetForm from './componets/EmployeeTimeSheetForm';
import ManagerRatingForm from './componets/ManagerRatingForm';
import Login from './pages/Login';
import SignupPage from './pages/SignUp';


const App = ()=>{
  return(
    <Router>
      <div>
        <Routes>
          <Route path='/SignUp' Component={SignupPage}/>
          <Route path='login' Component={Login}/>
          <Route path='/' exact Component={EmployeeTimeSheetForm}/>
          <Route path='/manager-rating/:timesheetId' Component={ManagerRatingForm}/>
        </Routes>
      </div>
    </Router>
  );
};



// function App() {
//   return (
//     <>
//      <EmployeeTimeSheetForm/>
//      <ManagerRatingForm/>
//     </>
//   );
// }

export default App;
