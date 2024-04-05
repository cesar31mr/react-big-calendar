/* eslint-disable react/prop-types */
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/User/LoginForm";
import LandingPage from "./components/LandingPage";
import { getToken } from "./services/user_services";
import ErroBoundary from "./ErrorBoundary";

export default function App() {
    const token = getToken();
    return (
        <div className="w-full">
            <ErroBoundary>
                <BrowserRouter>
                    {token ? <LandingPage /> : <LoginForm />}
                </BrowserRouter>
            </ErroBoundary>
        </div>
    );
}
