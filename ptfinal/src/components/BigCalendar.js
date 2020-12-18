import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = (getCustomers) => {
    fetch("https://customerrest.herokuapp.com/gettrainings", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(getCustomers),
    })
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
    console.log(trainings);
  };

  const myEvents = trainings.map((data) => {
    return {
      id: data.id,
      title: [
        data.activity +
          " / " +
          data.customer.firstname +
          " " +
          data.customer.lastname,
      ],
      start: moment(data.date).toDate(),
      end: moment(data.date).add(data.duration, "minutes").toDate(),
      allDay: false,
    };
  });

  return (
    <div>
      <h1>Calendar</h1>
      <Calendar
        localizer={localizer}
        defaultView="month"
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default CalendarPage;
