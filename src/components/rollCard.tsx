import * as React from "react";
import "@mantine/dates/styles.css";
import {
  Box,
  Input,
  Button
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export interface RollData {
	id?: number;
	rollItemNumber: string;
	rollLength: string;
}

interface RollCardProps {
  id: number;
  rollData: RollData
  onDelete: () => void;
}

const RollCard: React.FC<RollCardProps> = (props) => {

  return (
    <Box className="bg-primaryOrange max-w-72 rounded-md relative p-8">
      <IconX
        className="absolute right-2 top-2 cursor-pointer hover:text-accentError"
        onClick={props.onDelete}
      />
      <Box>
        <Input mb={10} placeholder="Item Number" />
        <Input mb={12} placeholder="Roll Length" />
      </Box>
      <Button style={{background: 'red'}}>Save</Button>
    </Box>
  );
};

export default RollCard;
