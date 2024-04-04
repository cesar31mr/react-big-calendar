import MyBigCalendar from "../components/MyBigCalendar";
import UserForm from "../components/UserForm";
import Redireccionar from './Redireccionar';

const rutas = [
    {
        path: "/",
        component: UserForm,
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
        path: "*",
        component: Redireccionar
    }
]

export default rutas;