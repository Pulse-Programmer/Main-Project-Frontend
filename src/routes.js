import App from './App'
import Adminlogin from './components/logins/admin-login'
import Jobseekerlogin from './components/logins/jobseekers-login'
import Employerlogin from './components/logins/employer-login'

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
    }


]
export default routes