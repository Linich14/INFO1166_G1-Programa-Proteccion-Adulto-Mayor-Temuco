import { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { IconButton } from "react-native-paper";

export default function Calendario({ actualizarFecha }) {
	let semana = ["L", "M", "X", "J", "V", "S", "D"];
	let meses = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];
	const minDate = new Date();

	const onChange = (date, type) => {
		actualizarFecha(date);
	};

	return (
		<CalendarPicker
			startFromMonday={true}
			weekdays={semana}
			months={meses}
			previousTitle={"Anterior"}
			nextTitle={"Siguiente"}
			selectedDayColor="#FFB236"
			selectedDayTextColor="#FFFFFF"
			todayBackgroundColor="#9D9D9D"
			minDate={minDate}
			previousComponent={
				<IconButton icon="arrow-left" mode="contained" size={20} />
			}
			nextComponent={
				<IconButton icon="arrow-right" mode="contained" size={20} />
			}
			monthTitleStyle={{ color: "#FFFFFF" }}
			textStyle={{
				fontSize: 17,
				color: "#FFFFFF",
				fontWeight: "bold",
			}}
			onDateChange={onChange}
		/>
	);
}
