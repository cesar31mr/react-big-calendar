import About from "../components/About/About";
import MyBigCalendar from "../components/Calendario/MyBigCalendar";
import LoginForm from "../components/User/LoginForm";
import Redireccionar from './Redireccionar';

const rutas = [
    {
        path: "/",
        component: LoginForm,
        title: "Formulario de Usuario"
    },
    {
        path: "/calendar",
        component: MyBigCalendar,
        exact: true,
        title: "Calendario",
        visible: true
    },
    {
        path: "/about",
        component: About,
        title: "Acerca de",
        visible: true
    },
    {
        path: "*",
        component: Redireccionar
    }
]

export default rutas;