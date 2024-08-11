import App from './App'
import Login from './components/logins/Login'
import SignUp from './components/signups/SignUp'
import JobSeekerProfile from './components/Profiles/JobSeekerProfile'
import EmployersProfile from './components/Profiles/EmployersProfile'
import AdminProfile from './components/Profiles/AdminProfile'

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
      path: "/",
      element: <App />,
      children: [
        { path: "/jobseeker-profile", element: <JobSeekerProfile /> },
        { path: "/employers-profile", element: <EmployersProfile /> },
        { path: "/admin-profile", element: <AdminProfile /> },
        { path: "/", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
      ],
    },
  ]

export default routes;