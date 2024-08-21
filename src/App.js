import "./App.css";
import { useNavigate, Outlet } from "react-router-dom";
// import Login from './components/logins/Login';
import { useState, useEffect } from "react";

// import Welcomepage from './components/landing';

function App() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // auto-login
    if (token) {
      fetch("https://main-project-backend-1z6e.onrender.com/check_session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((r) => {
        if (r.ok) {
          r.json().then((user_data) => {
            setUser(user_data);
            console.log(user_data.role);

            if (user_data.role === "admin") {
              navigate("/Main-Project-Frontend/admin-profile");
            } else if (user_data.role === "employer") {
              navigate("/Main-Project-Frontend/employers-profile");
            } else if (user_data.role === ("job-seeker" || "jobseeker")) {
              navigate("/Main-Project-Frontend/jobseeker-profile");
            }
          });
        }
      });
    }
  }, []); //livd

  // if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      <Outlet context={{ user, setUser }} />
    </div>
  );
}

export default App;
