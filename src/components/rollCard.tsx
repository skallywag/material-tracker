import * as React from "react";
import "@mantine/dates/styles.css";
import {
  Box,
  Input,
  Button,
  Text,
  Pill,
  Flex
} from "@mantine/core";
import {useForm} from '@mantine/form'
import { IconX } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import DeleteRollModal from '../modals/deleteRollModal/DeleteRollModal'

export interface RollData {
	id: string;
  saved: boolean;
  rollNumber?: number;
	rollItemNumber: string;
	rollLength: string;
}

interface RollCardProps {
  id:string;
  rollData: RollData
  onDelete: () => void;
  onUpdate: (value) => void;
}

const RollCard: React.FC<RollCardProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  
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
    <Box className="bg-primaryOrange max-w-72 rounded-md pt-8 pr-10 pl-10 pb-8">
      <Flex  mb={20} justify={"space-between"}>
      <Pill size={"lg"} bg={props.rollData.saved ? "green" : "red"}>{props.rollData.saved ? "Saved" : "Unsaved"}</Pill>
      <IconX
        className="cursor-pointer hover:text-accentError"
        onClick={
          () => open()
        }
      />

      </Flex>

      <DeleteRollModal title={"Confirm Deletion"} onDelete={props.onDelete} opened={opened} open={open} close={close}/>
      <Text size="24px" mb={6}>Roll {props.rollData.rollNumber}</Text>
      <Box>
        <form  onSubmit={form.onSubmit(() => {
              props.onUpdate({ 
              id: props.id,
              saved: true,
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
