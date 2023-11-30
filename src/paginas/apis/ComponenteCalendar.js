import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

const ComponenteCalendario = () => {
  // Recuperar citas almacenadas en el localStorage al cargar la página
  const storedCitas = JSON.parse(localStorage.getItem("citas")) || [];
  const [citas, setCitas] = useState(storedCitas);

  useEffect(() => {
    // Actualizar el localStorage cada vez que cambian las citas
    localStorage.setItem("citas", JSON.stringify(citas));
  }, [citas]);

  const handleDateClick = (info) => {
    const titulo = prompt("Ingrese el nombre de la cita:");
    if (titulo) {
      const nuevaCita = { id: citas.length + 1, title: titulo, date: info.dateStr };
      const nuevasCitas = [...citas, nuevaCita];
      setCitas(nuevasCitas);
    }
  };

  const handleEditClick = (event) => {
    const nuevoTexto = prompt("Ingrese el nuevo nombre de la cita:", event.title);
    if (nuevoTexto) {
      const eventID = parseInt(event.id); // Convierte el ID del evento a número
      const citasActualizadas = citas.map((cita) =>
        cita.id === eventID ? { ...cita, title: nuevoTexto } : cita
      );
      console.log("Citas antes de editar:", citas);
      console.log("Citas después de editar:", citasActualizadas);
      setCitas(citasActualizadas);
    }
  };

  const handleRemoveClick = (event) => {
    console.log("Citas antes de eliminar:", citas);

    setCitas((prevCitas) => {
      const eventID = parseInt(event.id); // Convierte el ID del evento a número
      const nuevasCitas = prevCitas.filter((cita) => cita.id !== eventID);
      console.log(citas.id);
      console.log("Citas después de eliminar:", nuevasCitas);
      return nuevasCitas;
    });
  };

  const eventContent = (eventInfo) => {
    return (
      <div>
        <div>{eventInfo.event.title}</div>
        <button onClick={() => handleEditClick(eventInfo.event)}>Editar Texto</button>
        <button onClick={() => handleRemoveClick(eventInfo.event)}>Eliminar Texto</button>
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"50vh"}
        className="mt-4"
        events={citas}
        dateClick={handleDateClick}
        eventContent={eventContent}
        locale={esLocale}
      />
    </div>
  );
};

export default ComponenteCalendario;