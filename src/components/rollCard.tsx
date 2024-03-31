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
import RejectRollModal from "@/modals/rejectRollModal/RejectRollModal";
import CompleteRollModal from "@/modals/completeRollModal/CompleteRollModal";

export interface RollData {
	id: string;
  status: string;
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
  onReject: (value, length) => void;
}

const RollCard: React.FC<RollCardProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openRejectModal, setOpenRejectModal] = useState(false)
  const [openCompleteModal, setOpenCompleteModal] = useState(false)
  
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
        <RejectRollModal rollData={props.rollData} form={form} title={"Confirm Reject"} onReject={props.onReject} close={() => setOpenRejectModal(!openRejectModal)} opened={openRejectModal}/>
         <DeleteRollModal title={"Confirm Deletion"} onDelete={props.onDelete} opened={opened} open={open} close={close}/>
         <CompleteRollModal title={"Confirm Complete"} rollData={props.rollData} opened={openCompleteModal} close={() => setOpenCompleteModal(!openCompleteModal)} onUpdate={() => {
          props.onUpdate({ 
              id: props.id,
                complete: true,
                status: "Complete",
                rollLength: form.values.rollLength,
                rollItemNumber: form.values.rollItemNumber
                })
                setOpenCompleteModal(!openCompleteModal)
              }
                }/>

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
      <Pill size={"lg"} bg={props.rollData.status === "Saved" || props.rollData.status === "Complete" ? "green" : "red"}>{props.rollData.status}</Pill>
      </Flex>
      

      <Box>
        <form  onSubmit={form.onSubmit(() => {
              props.onUpdate({ 
              id: props.id,
              status: "Saved",
              rollItemNumber: form.values.rollItemNumber,
              rollLength: form.values.rollLength,
                })
          })}   
        >
        <Input mb={10} placeholder="Item Number" disabled={props.rollData.status === "Complete" || props.rollData.status === "Rejected"} {...form.getInputProps("rollItemNumber")} />
        <Input mb={12} placeholder="Roll Length" disabled={props.rollData.status === "Complete" || props.rollData.status === "Rejected"} {...form.getInputProps("rollLength")}/>
        {props.rollData.rejected ? <Text>Reject Length: {props.rollData.rejectLength}</Text> : null}
        <Flex justify={"space-around"} gap={8}>

          {props.rollData.status === "Unsaved" && <Button bg={'red'} type="submit">Save</Button>}

          {props.rollData.rejected === false && props.rollData.status === "Saved" && props.rollData.complete === false && <>
          <Button onClick={() => setOpenRejectModal(!openRejectModal)} bg={"red"}>Reject</Button>
          <Button bg={"red"} onClick={() => setOpenCompleteModal(!openCompleteModal)}>Complete</Button>
          </>}          
        </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default RollCard;


