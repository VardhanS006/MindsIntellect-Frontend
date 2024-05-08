import Reg from './components/Loginout/Reg';
import Login from './components/Loginout/Login';
import Navbart from './components/Navbart';
import Mainnav from './components/Mainnav';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Askme from './components/QnAPortal';
import AddQuestion from './components/Askquestion';
import Unanswered from './components/Unanswered';
import Postanswer from './components/Postanswer';
import Pending from './components/Pending';
import Plans from './components/Plans';
import Contact from './components/Contact';
import Home from './components/Home';
import Subscription from './components/Subscription';
function App() {



  return (
    <div style={{ padding: "0px", margin: "0px", zoom: "0.75" }}>
      <Router>
        <Navbart />
        
        <Mainnav />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Reg />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/plans' element={<Plans />} />
          <Route exact path='/contact' element={<Contact />} />


          <Route path='/l/dashboard' element={<Dashboard />} />
          <Route path='/m/dashboard' element={<Dashboard />} />

          <Route path='/l/leaderboard' element={<Leaderboard />} />
          <Route path='/m/leaderboard' element={<Leaderboard />} />

          <Route path='/subscription' element={<Subscription />} />

          <Route path='/l/pendings' element={<Pending />} />
          <Route path='/m/pendings' element={<Pending />} />

          <Route exact path='/qnaportal' element={<Askme />} />
          <Route exact path='/l/askquestion' element={<AddQuestion />} />

          <Route exact path='/m/postanswer/:quesId' element={<Postanswer />} />

          <Route exact path='/m/unanswered' element={<Unanswered />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
