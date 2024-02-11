import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Layout from "./Components/Layout/Layout";
import { ToastContainerComponent } from "./Components/Toast/Toast.jsx";
import reportWebVitals from "./reportWebVitals";
import "./styles/default.scss";

// AuthContext
import { AuthProvider } from "./Contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <Layout>
                    <App />
                    <ToastContainerComponent />
                </Layout>
            </AuthProvider>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
