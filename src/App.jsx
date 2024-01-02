/* eslint-disable react/prop-types */
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { CiCalendarDate } from "react-icons/ci";
import 'dayjs/locale/es';
import "./App.css"

dayjs.locale('es');

export default function App() {
    const localizer = dayjsLocalizer(dayjs);

    const events = [
      {
        start: dayjs('2024-01-02T11:00:00').toDate(),
        end: dayjs('2024-01-02T12:00:00').toDate(),
        title: "Daily"
      },
      {
        start: dayjs('2024-01-03T11:00:00').toDate(),
        end: dayjs('2024-01-04T12:00:00').toDate(),
        title: "Curso de React"
      }
    ]

    const components = {
      event: props => {
        console.log(props);
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
          }}>
            <CiCalendarDate />
            <div>{props.title}</div>
            <div>{props.start}</div>
            <div>{props.end}</div>
          </div>
        );
      }
    };

    return (
        <div style={{height: '95vh', width: '70vw'}}>
            <Calendar
            localizer={localizer}
            events={events}
            views={['month', 'week', 'day']}
            // view="day"
            date={dayjs('2024-01-01T11:00:00').toDate()}
            toolbar={true}
            defaultView="month"
            min={dayjs('2024-01-01T08:00:00').toDate()}
            max={dayjs('2034-01-01T19:00:00').toDate()}
            // style={{ height: "500px", width: "500px" }}
            formats={{
              dayHeaderFormat: date => dayjs(date).format('DD/MM/YYYY')
            }}
            components={components}
            />
        </div>
    );
}
