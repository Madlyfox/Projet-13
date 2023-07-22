import Login from "./features/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./features/registration/Register";
import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./features/auth/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          {/* protected routes */}

          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
