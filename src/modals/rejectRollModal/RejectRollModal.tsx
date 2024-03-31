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
    onReject: (values, length) => void;
    form: any;
    rollData: any;
}


const RejectRollModal: React.FC<RejectRollModal> = (props) => {
    const form = useForm({
    initialValues: {
      jobLength: ""
    },
    validate: {
      jobLength: (value) => value.length < 1 && "Enter Job Length"
    },
  });
  
  return (
    <Modal centered opened={props.opened} onClose={props.close} title={props.title}>
        <Text mb={10}>Are you sure you want to reject this roll? This cannot be undone.</Text>
        <form onSubmit={form.onSubmit(() => {
            props.onReject({ 
              id: props.rollData.id,
              rollLength: props.rollData.rollLength,
              status: "Rejected",
              complete: true
                }, form.values.jobLength)
            props.close()
        })}>
            <Text>Enter Current Job Footage</Text>
            <Input mb={12} placeholder={"Press Count"} {...form.getInputProps("jobLength")}/>
            <Flex justify={"space-around"}>
            <Button bg={"red"} type="submit">Reject</Button>
            <Button bg={"blue"} onClick={props.close}>Cancel</Button>
        </Flex>
        </form>
    </Modal>
  );
};
export default RejectRollModal;
