import * as React from "react";
import "@mantine/dates/styles.css";
import {
  Modal,
  Flex,
  Text,
  Input,
  Button,
} from "@mantine/core";
import {useForm} from '@mantine/form'


interface RejectRollModal {
    title: string;
    opened: boolean;
    close: () => void;
    onUpdate: (values) => void;
    rollData: any;
}


const CompleteRollModal: React.FC<RejectRollModal> = (props) => {
  return (
    <Modal centered opened={props.opened} onClose={props.close} title={props.title}>
        <Text>Are you sure you want to complete this roll?</Text>
        <Text mb={15}>Ensure roll information is correct</Text>
            <Flex justify={"space-around"}>
            <Button bg={"red"} onClick={props.onUpdate}>Complete</Button>
            <Button bg={"blue"} onClick={props.close}>Cancel</Button>
        </Flex>
    </Modal>
  );
};
export default CompleteRollModal;
