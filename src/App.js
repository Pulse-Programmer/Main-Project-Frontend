import "./App.css";
import { useNavigate, Outlet } from "react-router-dom";
// import Login from './components/logins/Login';
import { useState, useEffect } from "react";

// import Welcomepage from './components/landing';

function App() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user_data) => {
          setUser(user_data);
          if (user_data.role === "admin") {
            navigate("/Main-Project-Frontend/admin-profile");
          } else if (user_data.role === "jobseeker") {
            navigate("/Main-Project-Frontend/jobseeker-profile");
          } else if (user_data.role === "employer") {
            navigate("/Main-Project-Frontend/employers-profile");
          }
        });
      }
    });
  }, []);

  // if (!user) return <Login onLogin={setUser} />;

  console.log(user);

  return (
    <div className="App">
      <Outlet context={{ user, setUser }} />
    </div>
  );
}

export default App;
