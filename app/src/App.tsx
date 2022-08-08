import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register, Main } from "pages/Index";
import { useTareasGlobalContext } from "Hooks/useTareasGlobalContext";
import { ProtectedByAuth } from "components/ProtectedByAuth";
import { PersistLogin } from "components/PersistLogin";
import { Nav } from "components/Nav";
import { UserProfile } from "pages/UserProfile";
import { useInterceptor } from "Hooks/useInterceptor";

function App() {
  const { user } = useTareasGlobalContext();
  useInterceptor();

  return (
    <div className="App">
      <Nav></Nav>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        ></Route>

        <Route element={<PersistLogin />}>
          <Route element={<ProtectedByAuth />}>
            <Route path="/" element={<Main />}></Route>
            <Route path="/profile/user/:id" element={<UserProfile />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
