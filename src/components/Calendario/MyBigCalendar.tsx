/* eslint-disable react/prop-types */
import React from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { CiCalendarDate } from "react-icons/ci";
import "dayjs/locale/es";

dayjs.locale("es");

export default function MyBigCalendar() {
    const localizer = dayjsLocalizer(dayjs);

    const events = [
        {
            start: dayjs("2024-04-02T11:00:00").toDate(),
            end: dayjs("2024-04-02T12:00:00").toDate(),
            title: "Daily",
        },
        {
            start: dayjs("2024-04-03T11:00:00").toDate(),
            end: dayjs("2024-04-04T12:00:00").toDate(),
            title: "Curso de React",
        },
    ];

    const components = {
        event: (props) => {
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                    }}
                >
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
                        <button
                            onClick={() => console.log("Eliminar evento", props)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            );
        },
    };

    return (
        <div style={{ height: "95vh", width: "70vw" }}>
            <Calendar
                localizer={localizer}
                events={events}
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
