import { View } from 'react-native';
import { PrivatePageStyles } from "../../style"
import React from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { WeatherWidget } from '../pages/widgets/Weather';
import { NoteWidget } from '../pages/widgets/Note';
import { ClockWidget } from '../pages/widgets/Clock';
import { ChatWidget } from '../pages/widgets/Chat';
import { ToDoWidget } from '../pages/widgets/ToDo';

export function DisplayWidget (navigation) {
  const [selected, setSelected] = React.useState([]);
  
  const data = [
      {key:'1', value:'Météo'},
      {key:'2', value:'Note'},
      {key:'3', value:'ToDo'},
      {key:'4', value:'Clock'},
      {key:'5', value:'Chat'},
  ]

  function isSelected(val) {
   const valuesArray = Object.values(selected);
   const isValuePresent = valuesArray.includes(val);
   return isValuePresent;
  }

  return (
    <View>
      <View styles={PrivatePageStyles.listComponent}>
        <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={data} 
          save="value"
          boxStyles={{borderRadius:10, width: 300}} //
          dropdownStyles={{borderRadius:10, width: 300}}
          placeholder={"Selectionnez widgets"}
          maxHeight={200}
        />
      </View>

      <View>
        {isSelected("Météo") && <WeatherWidget/>}
        {isSelected("Clock") && <ClockWidget />}
        {isSelected("Note") && <NoteWidget />}
        {isSelected("ToDo") && <ToDoWidget />}
        {isSelected("Chat") && <ChatWidget />}
      </View>
    </View>
  );
}
