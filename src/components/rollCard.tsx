import * as React from "react";
import "@mantine/dates/styles.css";
import {
  Box,
  Input,
  Button,
  Text
} from "@mantine/core";
import {useForm} from '@mantine/form'
import { IconX } from "@tabler/icons-react";

export interface RollData {
	id?: number;
  rollNumber: number;
	rollItemNumber: string;
	rollLength: string;
}

interface RollCardProps {
  id: number;
  rollData: RollData
  onDelete: () => void;
  onUpdate: ({}) => void;
}

const RollCard: React.FC<RollCardProps> = (props) => {
     const form = useForm({
    initialValues: {
      rollItemNumber: props.rollData.rollItemNumber || "",
      rollLength: props.rollData.rollLength || "",
    },
    validate: {
      rollItemNumber: (value) =>
        value.length < 3 && "Enter item number",
      rollLength: (value) => value.length < 1 && "Enter roll length",
    },
  });

 
  return (
    <Box className="bg-primaryOrange max-w-72 rounded-md relative p-8">
      <Text size="24px" mb={6}>Roll {props.rollData.rollNumber}</Text>

      <IconX
        className="absolute right-2 top-2 cursor-pointer hover:text-accentError"
        onClick={
          props.onDelete
        }
      />
      <Box>
        <form  onSubmit={form.onSubmit(() => {
              props.onUpdate({ 
              id: props.id,
              rollItemNumber: form.values.rollItemNumber,
              rollLength: form.values.rollLength,
                })
          })}   
        >
        <Input mb={10} placeholder="Item Number" {...form.getInputProps("rollItemNumber")} />
        <Input mb={12} placeholder="Roll Length" {...form.getInputProps("rollLength")}/>
        <Button bg={'red'} type="submit">Save</Button>
        </form>
      </Box>
    </Box>
  );
};

export default RollCard;
