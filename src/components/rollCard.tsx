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
  rejected?: boolean;
  rollNumber?: number;
	rollItemNumber: string;
	rollLength: string;
}

interface RollCardProps {
  id:string;
  rollData: RollData
  onDelete: () => void;
  onUpdate: (value) => void;
  onReject: (value) => void;
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
    <Box className="bg-primaryOrange max-w-72 rounded-md p-8">

      <Flex mb={14} style={{borderBottom: "2px solid black"}} justify={"space-between"}>
        <Text size="24px">Roll {props.rollData.rollNumber}</Text>
          <IconX
        className="cursor-pointer hover:text-accentError"
        onClick={
          () => open()
        }
      />
      </Flex>
  
      <Flex mb={8} justify={"space-between"}>
      <Pill size={"lg"} bg={props.rollData.saved ? "green" : "red"}>{props.rollData.saved ? "Saved" : "Unsaved"}</Pill>
      {props.rollData.rejected && <Pill size="lg" bg={"red"}>Rejected</Pill>}      
      </Flex>
     
      <DeleteRollModal title={"Confirm Deletion"} onDelete={props.onDelete} opened={opened} open={open} close={close}/>
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
        <Flex justify={"space-around"}>
        <Button bg={'red'} type="submit">{props.rollData.saved ? "Update" : "Save"}</Button>
       { props.rollData.rejected ? null : <Button bg={"red"} onClick={() => props.onReject({ ...props.rollData, rejected: true })}>Reject</Button>}
        </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default RollCard;
