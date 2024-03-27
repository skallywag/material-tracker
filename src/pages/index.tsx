import React, { useState, useEffect } from 'react';
import "@mantine/dates/styles.css";
import {
  Box,
  Button,
  Flex,
} from "@mantine/core";
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import RollCard from "@/components/rollCard";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export interface Roll {
  id: number;
  rollItemNumber: '';
  rollLength: ''
}

const TrackerPage = () => {
const [rolls, setRolls] = useState([]);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const storedRolls = JSON.parse(localStorage.getItem('rolls') || '[]');
    setRolls(storedRolls);
  }
}, []);


const updateRoll = (updatedRollData) => {
  
  setRolls((prevRolls) => {
    const updatedRolls = prevRolls.map(roll =>
      roll.id === updatedRollData.id ? { ...roll, ...updatedRollData } : roll
    );
    localStorage.setItem('rolls', JSON.stringify(updatedRolls));
    return updatedRolls;
  });
  toast("Roll Updated!")
};

const handleAddRoll = () => {
  setRolls(prevRolls => {
    const newRoll = {
      id: uuidv4(),
      rollNumber: rolls.length + 1,
      rollItemNumber: '',
      rollLength: '',
    };

    const updatedRolls = [...prevRolls, newRoll];
    localStorage.setItem("rolls", JSON.stringify(updatedRolls));
    return updatedRolls;
  });
};

function addTotalLength() {
let totalSum = 0;

rolls.forEach(obj => {
  totalSum += Number(obj.rollLength.replace(',', ''))
});

console.log(totalSum);
}
  
  return (
    <Box className="page">
      <Button mb={10} className="bg-accentError"
        onClick={() => handleAddRoll()}>
        Add New Roll
      </Button>

      <Flex direction="column" gap={8}>
        {rolls ? rolls.map((item) => (
          <RollCard 
          id={item.id}
          key={item.id} 
          onUpdate={updateRoll}
          rollData={item}
        	onDelete={() => {
              const upDatedRolls = rolls.filter(
							(roll: Roll) => roll.id !== item.id
						);
            localStorage.setItem("rolls", JSON.stringify(upDatedRolls));
						setRolls(upDatedRolls);
            toast("Roll Deleted!")
					}}
					/>
        )) : null}
      </Flex>
      <Button bg={"blue"} onClick={() => addTotalLength()}>End Job</Button>
    </Box>
  );
};
export default TrackerPage;
