import * as React from "react";
import "@mantine/dates/styles.css";
import {
  Modal,
  Flex,
  Text
} from "@mantine/core";
import { Button } from '@mantine/core';

interface DeleteRollModal {
    title: string;
    opened: boolean;
    close: () => void;
    open: () =>void;
    onDelete: () => void;
}


const HistoryPage: React.FC<DeleteRollModal> = (props) => {
  return (
    <Modal centered opened={props.opened} onClose={props.close} title={props.title}>
        <Text mb={10}>Are you sure you want to delete this roll?</Text>
        <Flex justify={"space-around"}>
            <Button bg={"red"} onClick={props.onDelete}>Delete</Button>
            <Button bg={"blue"} onClick={props.close}>Cancel</Button>
        </Flex>
    </Modal>
  );
};
export default HistoryPage;
