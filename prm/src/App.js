import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./Components/home/home";
import Tasks from "./Components/tasks/Tasks";
import Calender from "./Components/calender/calender";
import Member from "./Components/member/member";
import Settings from "./Components/settings/settings";
import Login from "./Components/logout/login";
// import ProjectPlan from './Components/projectPlan/projectPlan';
// import ConfirmationDialog from "./Components/utils-components/confirmation-dialog";
// import Loader from "./Components/utils-components/loader";

import CreateProject from "./Components/Pages/CreateProject";
import ProjectSetting from "./Components/Pages/ProjectSetting";
import EditProfile from "./Components/Pages/EditProfile";
import Signin from "./Components/Pages/signin";
import CreateAccount from "./Components/Pages/CreateAccount";
import DropPage from "./Components/Pages/DropPage";
import Dad2 from "./Components/dad/Dad2";
import LogIn from "./Components/Pages/LogIn";
import Members from "./Components/Pages/Memebers";
import TDboard from "./Components/Pages/taskDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tasks/:id" element={<Tasks />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/member" element={<Member />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createProject" element={<CreateProject />} />
        <Route path="/projectSetting" element={<ProjectSetting />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/dropPage" element={<DropPage />} />
        <Route path="/dad2" element={<Dad2 />} />
        <Route path="/signIn" element={<LogIn />} />
        <Route path="/caccount" element={<CreateAccount />} />
        <Route path="/members" element={<Members />} />
        <Route path="/tdb" element={<TDboard />} />
      </Routes>
    </div>
  );
}

export default App;
