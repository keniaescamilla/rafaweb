import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

const ComponenteCalendario = () => {
  const storedCitas = JSON.parse(localStorage.getItem("citas")) || [];
  const [citas, setCitas] = useState(storedCitas);

  useEffect(() => {
    localStorage.setItem("citas", JSON.stringify(citas));
  }, [citas]);

  const handleDateClick = (info) => {
    const titulo = prompt("Ingrese el nombre de la cita:");
    if (titulo !== null && titulo.trim() !== "") {
      const estadoEmocional = prompt("Ingrese el estado emocional:");
      const notas = prompt("Ingrese notas de la sesión:");
      const nuevoEvento = {
        id: citas.length + 1,
        title: titulo,
        date: info.dateStr,
        estadoEmocional: estadoEmocional,
        notas: notas,
      };
      const nuevasCitas = [...citas, nuevoEvento];
      setCitas(nuevasCitas);
    } else {
      alert("Debe ingresar un texto para el nombre de la cita.");
    }
  };

  const handleEditClick = (event) => {
    const nuevoTexto = prompt("Ingrese el nuevo nombre de la cita:", event.title);
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
      const eventID = parseInt(event.id); 
      const citasActualizadas = citas.map((cita) =>
        cita.id === eventID ? { ...cita, title: nuevoTexto } : cita
      );
      setCitas(citasActualizadas);
    } else {
      alert("Debe ingresar un texto para el nuevo nombre de la cita.");
    }
  };


  const handleRemoveClick = (event) => {
    const eventID = parseInt(event.id);
    const nuevasCitas = citas.filter((cita) => cita.id !== eventID);
    setCitas(nuevasCitas);
  };
  const eventContent = (eventInfo) => {
    return (
      <div style={{ color: 'white', backgroundColor: getColorByEmotion(eventInfo.event.extendedProps.estadoEmocional) }}>
        <div>{eventInfo.event.title}</div>
        <div>Estado Emocional: {eventInfo.event.extendedProps.estadoEmocional}</div>
        <div>Notas: {eventInfo.event.extendedProps.notas}</div>
        <button onClick={() => handleEditClick(eventInfo.event)}>Editar Texto</button>
        <button onClick={() => handleRemoveClick(eventInfo.event)}>Eliminar Texto</button>
      </div>
    );
  };


  const getColorByEmotion = (emotion) => {
    switch (emotion) {
      case "feliz":
        return "yellow";
      case "triste":
        return "blue";
      case "ansioso":
        return "orange";
        case "enojado":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>Calendario de Sesiones</h1>
      <p className="p-meds">Te presentamos una herramienta que Facilita la programación y el seguimiento de 
        las sesiones, consultas, actividades o cualquier evento relevante para su salud mental.
que ademas le Permitira registrar el estado emocional asociado, brindando la oportunidad de identificar patrones y tendencias en el estado de ánimo a lo largo del tiempo.</p>
<p className="p-meds">Emociones y Colores : feliz: Amarillo, triste: Azul, ansioso: Naranja, enojado: Rojo </p>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "prev",
          center: "title",
          end: "next",
        }}
        height={"70vh"}
        className="mt-4"
        events={citas}
        dateClick={handleDateClick}
        eventContent={eventContent}
        locale={esLocale}
        titleFormat={{
          month: 'long',
          year: 'numeric',
          separator: ' - ',
          day: 'numeric'
        }}
      />
    </div>
  );
};

export default ComponenteCalendario;