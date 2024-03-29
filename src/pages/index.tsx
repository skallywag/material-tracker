import React, { useState, useEffect } from 'react';
import "@mantine/dates/styles.css";
import {
  Box,
  Button,
  Flex,
  Input,
  Title,
  Text
} from "@mantine/core";
import {useForm} from '@mantine/form'
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import RollCard from "@/components/rollCard";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export interface Roll {
  id: string;
  saved: boolean;
  rollNumber?: number;
  rollItemNumber: '';
  rollLength: ''
}

const TrackerPage = () => {
const [rolls, setRolls] = useState<Roll[]>([]);

 const form = useForm({
    initialValues: {
      jobLength: "",
    },
    validate: {
      jobLength: (value) => value.length <= 0 && "Enter job length",
    },
  });

useEffect(() => {
  if (typeof window !== 'undefined') {
    const storedRolls: Roll[] = JSON.parse(localStorage.getItem('rolls') || '[]');
    setRolls(storedRolls);
  }
}, []);


function updateRoll(updatedRollData: Roll){
  setRolls((prevRolls: Roll[]) => {
    const updatedRolls = prevRolls.map(roll =>
      roll.id === updatedRollData.id ? { ...roll, ...updatedRollData } : roll
    );
    localStorage.setItem('rolls', JSON.stringify(updatedRolls));
    return updatedRolls;
  });
  toast("Roll Updated!")
};

const handleAddRoll = (): void => {
    setRolls((prevRolls: Roll[]) => { 
      const newRoll: Roll = {
        id: uuidv4(),
        saved: false,
        rollNumber: rolls.length + 1,
        rollItemNumber: '',
        rollLength: '',
      };

      const updatedRolls: Roll[] = [...prevRolls, newRoll];
      localStorage.setItem('rolls', JSON.stringify(updatedRolls));
      return updatedRolls;
    });
  };

function addTotalLength() {
  const totalSum = rolls.reduce((sum, obj) => {
    const numericValue = Number(obj.rollLength.replace(',', ''));
    return sum + (isNaN(numericValue) ? 0 : numericValue);
  }, 0);

  console.log(totalSum);
}
  
  return (
    <Box className="page">
    <Box className='flex flex-row justify-between'>
      <Box>
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
      </Box>
   


      <Box mr={"100px"}>
        <Title>CO-</Title>
        <Title mb={2} size={16}>Total Footage Ran</Title>
        <form onSubmit={form.onSubmit(() => {
          addTotalLength()
        })}>
        <Input mb={12} type='number' placeholder="Total Job Footage" {...form.getInputProps("jobLength")}/>
        <Button bg={"blue"} type='submit'>End Job</Button>
        </form>
      </Box>
      </Box>
    </Box>
  );
};
export default TrackerPage;
