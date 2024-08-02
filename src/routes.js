import App from './App'
import Adminlogin from './components/logins/admin-login'
import Jobseekerlogin from './components/logins/jobseekers-login'
import Employerlogin from './components/logins/employer-login'
import JobSeekerSignUp from './components/signups/jobseeker-signUp'
import EmployerSignUp from './components/signups/employer-signUp'
import AdminSignUp from './components/signups/admin-signUp'

const routes = [
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/admin-login',
        element: <Adminlogin/>
    },
    {
        path: '/jobseeker-login',
        element: <Jobseekerlogin/>
    },
    {
        path: '/employer-login',
        element: <Employerlogin/>
    },
    {
        path: '/jobseeker-signup',
        element: <JobSeekerSignUp/>
    },
    {
        path: '/employer-signup',
        element: <EmployerSignUp/>
    },
    {
        path: '/admin-signup',
        element: <AdminSignUp/>
    },
    // Add more paths here as needed...
    // Add more routes here as needed...


]
export default routes