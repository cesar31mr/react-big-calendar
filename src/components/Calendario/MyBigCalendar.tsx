/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { CiCalendarDate } from "react-icons/ci";
import "dayjs/locale/es";
import { getIdentity } from "../../services/user_services";
import { getDatesByUser, deleteDate } from "../../services/date_services";
import { DateEntity } from "../../models/date_model";
import { alertaError, alertaSuccess } from "../../utils/alertas";

dayjs.locale("es");

export default function MyBigCalendar() {
    const [datesEntity, setDatesEntity] = useState<DateEntity[]>([]);

    const localizer = dayjsLocalizer(dayjs);
    const identity = getIdentity();

    async function getDates() {
        try {
            var tmp = await getDatesByUser(identity._id);
            setDatesEntity(tmp);
        } catch (error) {
            console.log("Error al obtener fechas", error);
        }
    }

    const deleteEvent = async (prop) => {
        try {
            console.log("Eliminar evento", JSON.stringify(prop));
            var deleted: boolean = await deleteDate(prop["event"]._id);
            if (deleted) {
                await getDates();
                alertaSuccess("Evento eliminado");
            } else {
                alertaError("Error al eliminar evento");
            }
        } catch (error) {
            alertaError(
                error.response.data.message ?? "Error al eliminar evento"
            );
        }
    };

    const components = {
        event: (props) => {
            return (
                <div className="flex-row gap-10 items-center">
                    <CiCalendarDate />
                    <div>{props.title}</div>
                    <div>{props.start}</div>
                    <div>{props.end}</div>
                    <div>
                        <button
                            onClick={() => console.log("Editar evento", props)}
                        >
                            Editar
                        </button>
                        <button onClick={() => deleteEvent(props)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            );
        },
    };

    useEffect(() => {
        getDates();
    }, []);

    return (
        <div
            style={{ height: "95vh", width: "70vw" }}
            className=" bg-white border-2 border-gray-300 rounded-lg shadow-lg"
        >
            <Calendar
                localizer={localizer}
                events={datesEntity}
                toolbar={true}
                defaultView="month"
                min={dayjs("2024-01-01T08:00:00").toDate()}
                max={dayjs("2034-01-01T19:00:00").toDate()}
                formats={{
                    dayHeaderFormat: (date) => dayjs(date).format("DD/MM/YYYY"),
                }}
                components={components}
                messages={{
                    next: "Siguiente",
                    previous: "Anterior",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Dia",
                    date: "Fecha",
                    time: "Hora",
                    event: "Evento",
                    showMore: (total) => `+ Ver más (${total})`,
                }}
            />
        </div>
    );
}
