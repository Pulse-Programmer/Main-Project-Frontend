import App from "./App";
import Login from "./components/logins/Login";
import SignUp from "./components/signups/SignUp";
import JobSeekerProfile from "./components/Profiles/JobSeekerProfile";
import EmployersProfile from "./components/Profiles/EmployersProfile";
import AdminProfile from "./components/Profiles/AdminProfile";
import FormComponent from "./components/Profiles/employer/input";
import UpdateForm from "./components/Profiles/employer/editing";

// const routes = [
//     {
//         path: '/',
//         element: <App/>
//     },
//     {
//         path: '/login',
//         element: <Login/>
//     },
//     {
//         path: '/signup',
//         element: <SignUp/>
//     },
//     {
//         path:'/jobseeker-profile',
//         element: <JobSeekerProfile/>
//     },
//     {
//         path:'/employers-profile',
//         element: <EmployersProfile/>
//     },
//     {
//         path:'/admin-profile',
//         element: <AdminProfile/>
//     },

// ]
// export default routes

const routes = [
  {
    path: "/Main-Project-Frontend",
    element: <App />,
    children: [
      {
        path: "/Main-Project-Frontend/jobseeker-profile",
        element: <JobSeekerProfile />,
      },
      {
        path: "/Main-Project-Frontend/employers-profile",
        element: <EmployersProfile />,
      },
      {
        path: "/Main-Project-Frontend/admin-profile",
        element: <AdminProfile />,
      },
      { path: "/Main-Project-Frontend", element: <Login /> },
      { path: "/Main-Project-Frontend/signup", element: <SignUp /> },
      {
        path: "/Main-Project-Frontend/company-form",
        element: <FormComponent />,
      },
      { path: "/Main-Project-Frontend/update-form", element: <UpdateForm /> },
    ],
  },
];

export default routes;
