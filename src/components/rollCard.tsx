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
import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import DeleteRollModal from '../modals/deleteRollModal/DeleteRollModal'
import RejectRollModal from "@/modals/RejectRollModal";

export interface RollData {
	id: string;
  saved: boolean;
  rejected?: boolean;
  rollNumber?: number;
	rollItemNumber: string;
  rejectLength: string;
	rollLength: string;
  complete: boolean;
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
  const [openRejectModal, setOpenRejectModal] = useState(false)
  
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
      {props.rollData.complete && <Pill size="lg" bg={"green"}>Completed</Pill>}     
      </Flex>


     <RejectRollModal rollData={props.rollData} form={form} title={"Confirm Reject"} onReject={props.onReject} close={() => setOpenRejectModal(!openRejectModal)} opened={openRejectModal}/>

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
        <Input mb={10} placeholder="Item Number" disabled={props.rollData.saved} {...form.getInputProps("rollItemNumber")} />
        <Input mb={12} placeholder="Roll Length" disabled={props.rollData.saved} {...form.getInputProps("rollLength")}/>
        {props.rollData.rejected ? <Text>Return Length: {props.rollData.rejectLength}</Text> : null}
        <Flex justify={"space-around"} gap={8}>


          {props.rollData.saved === false && <Button bg={'red'} type="submit">Save</Button>}

          {props.rollData.rejected === false && props.rollData.saved === true && props.rollData.complete === false && <>
          <Button onClick={() => setOpenRejectModal(!openRejectModal)} bg={"red"}>Reject</Button>
            <Button bg={"red"} onClick={() => props.onUpdate({ 
              id: props.id,
                complete: true
                })}>Complete</Button>
          </>}          
        </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default RollCard;


