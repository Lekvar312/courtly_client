import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Main from "./pages/Main.tsx";
import Courts from "./pages/Courts.tsx";
import Login from "./pages/Login.tsx";
import { store } from "./store/store.ts";
import SignUp from "./pages/SignUp.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Dashboard from "./components/Dashboard.tsx";
import DashboardUsers from "./components/DashboardUsers.tsx";
import DashboardCourts from "./components/DashboardCourts.tsx";
import DasboardBookings from "./components/DasboardBookings.tsx";
import Contacts from "./components/Contacts.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import BookingPage from "./pages/BookingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="courts" element={<Courts />} />
            <Route path="/courts/:id" element={<BookingPage />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="users" element={<DashboardUsers />} />
            <Route path="courts" element={<DashboardCourts />} />
            <Route path="bookings" element={<DasboardBookings />} />
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
