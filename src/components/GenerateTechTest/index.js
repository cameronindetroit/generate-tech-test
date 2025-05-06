import React from 'react'
import { Button, View, StyleSheet } from 'react-native'

const GenerateTechTest = (props) => {
	const { color, text,dateList,startDate,endDate,saveToDatabase,action,duplicateDates,duplicateEndDates} = props

	let dates = [];
	let endDates = [];
	let combinedArrays = []


	// Function to add months to a given date
	const addMonthsToDate = (date, months) => {
		const newDate = new Date(date);
		newDate.setMonth(newDate.getMonth() + months);
		return newDate.toISOString(); // Convert to YYYY-MM-DD format
	  };

//Button Click
const handleRecurrenceChange = () => {
	// Transform dateList to a simpler array for easier checks
	const existingDates = dateList.map(item => item._meta.record.c_bdb9v55e94rck49sr8ubx3str);


		// Transform dateList to a simpler array for easier checks
		const existingEndDates = dateList.map(item => item._meta.record.c_0tavm54ujamiv1mvvm6ttv2ec);
		// console.log("Initial End Dates dateList:", existingEndDates);
	

	let newDates = []; // Temporarily hold potential new dates

	let newEndDates = []; // Temporarily hold potential new dates
	
	// Adjusted comparison - only considering the date part for the existing dates
    const existingDatesSimple = existingDates.map(dateString => dateString.slice(0, 10)); // Extract just the YYYY-MM-DD

		// Adjusted comparison - only considering the date part for the existing dates
		const existingEndDatesSimple = existingEndDates.map(dateString => dateString.slice(0, 10)); // Extract just the YYYY-MM-DD

    
    // Generate up to 12 new dates from startDate
    for (let i = 1; i <= 12; i++) {
        const newDate = addMonthsToDate(startDate, i);
		const newEndDate = addMonthsToDate(endDate, i);

        // Check if the date part of the new date is not included in existingDatesSimple
        if (!existingDatesSimple.includes(newDate.slice(0, 10))) {
            newDates.push(newDate);
        }
		if (!existingEndDatesSimple.includes(newEndDate.slice(0, 10))) {
            newEndDates.push(newEndDate);
        }
    }

	
	if (newDates.length > 0) {
	  // Only update dates if there are new dates
	  dates = newDates;
	} else {
	  // Reset dates if no new dates were found
	  dates = [];
	  duplicateDates()
	}

	if (newEndDates.length > 0) {
		// Only update dates if there are new dates
		endDates = newEndDates;
	  } else {
		// Reset dates if no new dates were found
		endDates = [];
		duplicateEndDates()
	  }


// Within your handleRecurrenceChange function, after populating dates and endDates
if (dates.length > 0 && dates.length === endDates.length) {
	combinedArrays = dates.map((date, index) => ({
	  startDate: date,
	  endDate: endDates[index],
	}));
	console.log("Combined Arrays: ", combinedArrays);
	// action();
  } else {
	// Handle the scenario where dates and endDates do not align
	console.error("Dates and End Dates do not align.");
  }

	  
	  console.log("start dates", dates)
	  console.log("end dates", endDates)
	  setRecurringTechTestDates(combinedArrays);
	  action()
	
  };

//Add function to take new date if monthly due date is changed amd greate new dates 

//Add function to remove old dates if this happens 


//Function to export to database 
 const setRecurringTechTestDates = (dates) =>{
	for(let i= 0; i < dates.length; i++){
		saveToDatabase(dates[i].startDate, dates[i].endDate)
	}
	// console.log(dates)

}


	return(
		<View style={styles.wrapper}>
			<Button 
		title={text}
		color={color}
		onPress={handleRecurrenceChange}/>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default GenerateTechTest
