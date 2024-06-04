/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { CiCalendarDate, CiEdit, CiEraser } from "react-icons/ci";
import "dayjs/locale/es";
import { getIdentity } from "../../services/user_services";
import {
    getDatesByUser,
    deleteDate,
    updateDate,
    createDate,
} from "../../services/date_services";
import { DateEntity } from "../../models/date_model";
import {
    alertaError,
    alertaInfo,
    alertaQuestion,
    alertaSuccess,
} from "../../utils/alertas";
import EventoForm from "./EventoForm";
import { json } from "stream/consumers";
import Button from "../../utils/Button";

dayjs.locale("es");

export default function MyBigCalendar() {
    const [datesEntity, setDatesEntity] = useState<DateEntity[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editEntity, setEditEntity] = useState<DateEntity>({} as DateEntity);
    const [nuevoEvento, setNuevoEvento] = useState(false);

    const localizer = dayjsLocalizer(dayjs);
    const identity = getIdentity();

    async function getDates() {
        try {
            var tmp = await getDatesByUser(identity._id);
            setDatesEntity(tmp);
        } catch (error) {
            alertaError(`Error al obtener eventos: ${error}`);
        }
    }

    const deleteEvent = async (id: string) => {
        try {
            var confirmar = await alertaQuestion("¿Desea eliminar el evento?");
            if (confirmar) {
                var deleted: boolean = await deleteDate(id);
                if (deleted) {
                    await getDates();
                    closeModal();
                    alertaSuccess("Evento eliminado");
                } else {
                    alertaError("Error al eliminar evento");
                }
            }
        } catch (error) {
            alertaError(
                error.response.data.message ?? "Error al eliminar evento"
            );
        }
    };

    const btnGuardarOnClick = (evt?) => {
        const start = evt.start ?? new Date();
        const end = dayjs(start).add(1, "hour").toDate();
        setEditEntity({
            title: "",
            start: start,
            end: end,
            user: identity._id,
        } as DateEntity);
        setNuevoEvento(true);
        setShowModal(true);
    }

    const btnEditOnClic = (prop) => {
        setEditEntity(prop);
        setNuevoEvento(false);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditEntity({} as DateEntity);
    }

    const guardarEvento = async (prop: DateEntity) => {
        try {
            var saved : boolean = await createDate(prop);
            if(saved){
                await getDates();
                alertaSuccess("Evento creado");
                setShowModal(false);
            }
            setNuevoEvento(false);
        } catch (error) {
            alertaError("Error al crear evento");
        }
    }

    const editarEvento = async (prop: DateEntity) => {
        prop.start = dayjs(prop.start).toDate();
        prop.end = dayjs(prop.end).add(17, "hour").toDate();
        var tmp: DateEntity;
        tmp = JSON.parse(JSON.stringify(prop));
        var updated: boolean = await updateDate(tmp);
        if (updated) {
            await getDates();
            alertaSuccess("Evento actualizado");
            setShowModal(false);
        } else {
            alertaError("Error al actualizar evento");
        }
    };

    const components = {
        event: (props) => {
            return (
                <div className="flex flex-row items-center">
                    <CiCalendarDate />
                    <div>{props.title}</div>
                    <div>{props.start}</div>
                    <div>{props.end}</div>
                </div>
            );
        },
    };

    useEffect(() => {
        getDates();
    }, []);

    return (
        <div
            style={{ height: "85vh", width: "70vw" }}
            className=" bg-white border-2 border-gray-300 rounded-lg shadow-lg p-2 m-2 overflow-hidden relative flex flex-col justify-center"
        >
            <div className="flex p-2">
                <Button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" onClick={btnGuardarOnClick}>
                    Nuevo Evento
                </Button>
            </div>
            <Calendar
                selectable={true}
                localizer={localizer}
                events={datesEntity}
                toolbar={true}
                defaultView="month"
                min={dayjs("2024-01-01T08:00:00").toDate()}
                max={dayjs("2034-01-01T19:00:00").toDate()}
                formats={{
                    dayHeaderFormat: (date) => dayjs(date).format("DD/MM/YYYY"),
                }}
                views={["month", "agenda"]}
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
                onSelectEvent={(slotInfo) => {
                    console.log(`Info: ${JSON.stringify(slotInfo)}`)
                    btnEditOnClic(slotInfo);
                }}
                onSelectSlot={(e) => {
                    btnGuardarOnClick(e);
                }}

            />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {nuevoEvento ? "Nuevo Evento" : "Editar Evento"}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-35 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            X
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <EventoForm
                                        modelo={editEntity}
                                        onSubmit={nuevoEvento ? guardarEvento : editarEvento}
                                        cancelChildren="Eliminar"
                                        onCancelar={() => {
                                            if(nuevoEvento)
                                                closeModal();
                                            else
                                                deleteEvent(editEntity["_id"])
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
