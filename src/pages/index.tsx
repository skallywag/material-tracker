import React, { useState } from 'react';
import "@mantine/dates/styles.css";
import {
  Box,
  Button,
  Flex
} from "@mantine/core";
import RollCard from "@/components/rollCard";
import type { RollData } from "@/components/rollCard";


interface Roll {
  id: number;
  rollItemNumber: '';
  rollLength: ''
}

const TrackerPage = () => {
  const [rolls, setRolls] = useState<Roll[]>([]);

  function handleAddRoll(){
    setRolls([
						...rolls,
									{
										id: rolls.length + 1,
										rollItemNumber: '',
										rollLength: '',
									}
								]);
  }

  function handleDeleteRoll(item: number) {    
      const newRolls = rolls.filter(
							(roll: RollData) => roll.id !== item
              );
              setRolls(newRolls);
  }

  return (
    <Box className="page">
      <Button mb={10} className="bg-accentError"
      onClick={() => handleAddRoll()}>
        Add New Roll
      </Button>

      <Flex direction="column" gap={8}>
        {rolls ? rolls.map((item, index) => (
            <RollCard id={index} key={item.id} rollData={item} onDelete={() => handleDeleteRoll(item.id)}
					
					/>
        )) : null}
      </Flex>
    </Box>
  );
};
export default TrackerPage;
