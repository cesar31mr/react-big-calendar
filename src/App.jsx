/* eslint-disable react/prop-types */
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import UserForm from "./components/UserForm";
import MyBigCalendar from "./components/MyBigCalendar";
// import Menu from "./utils/Menu";
import {getToken} from './services/user_services'

export default function App() {
  const token = getToken();
    return (
        <div className="w-full">
            {/* <Menu /> */}
            <BrowserRouter>
                {token ? <MyBigCalendar /> : <UserForm />}
            </BrowserRouter>
        </div>
    );
}
