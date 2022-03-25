import {FC, useState} from "react";
import React from "react";
import {ProductComponent} from "../../libs/dataUtils";
import firebase from "firebase/compat";
import {Button, MenuItem, Select, TextField} from "@mui/material";

interface ComponentDisplayProps {
  component: ProductComponent,
  onUpdate: Function,
  index: number
}


const ComponentDisplay = (props: ComponentDisplayProps) => {
  const [updater, setUpdater] = useState(0);


  const repaint = () => {
    setUpdater(updater + 1);
  }

  const component = props.component;
  const updateParent = props.onUpdate;
  const index = props.index;

  console.log("Component display: ")
  console.log(component.data)

  let name = component.getName()
  let type = component.getType();
  let price = component.getPrice();
  let isChoice = (type === "choice");


  let emChoices: any[] = [];
  let choices;


  if (isChoice) {
    let choices = component.getChoices();

    if (choices) {
      for (let i = 0; i < choices.length; i++) {

        const choice = choices[i];

        const choiceName = choice.name;
        const choicePrice = choice.price;

        const em =
          <div className={"edit-component-sub"}>
            <TextField
              variant={"outlined"}
              label={"Name"}
              color={"secondary"}
              defaultValue={choiceName}
              onChange={(e) => {
                choice.name = e.target.value;
                component.setChoice(choice, i);
                updateParent(component, index);
              }}
            />
            <TextField
              variant={"outlined"}
              label={"Price"}
              color={"secondary"}
              defaultValue={choicePrice}
              type={"number"}
              onChange={(e) => {
                choice.price = Number(e.target.value);
                component.setChoice(choice, i);
                updateParent(component, index);
              }}
            />
          </div>
        emChoices.push(em);

      }
    }
  }


  return (
    <div className={"edit-component-sub"}
         style={{
           display: "flex",
           flexFlow: "column",
           gap: "10px"
         }}
    >
      <TextField
        variant={"outlined"}
        label={"Name"}
        color={"secondary"}
        defaultValue={name}
        onChange={(e) => {
          component.setName(e.target.value);
          updateParent(component, index);
        }}
      />

      <Select
        label="Type"
        defaultValue={type}
        color={"secondary"}
        onChange={(e) => {
          // @ts-ignore
          component.setType(e.target.value);
          updateParent(component, index);
          repaint();
        }}
      >
        <MenuItem value={"choice"}>Choice</MenuItem>
        <MenuItem value={"amount"}>Amount</MenuItem>
        <MenuItem value={"addon"}>Add-On</MenuItem>
      </Select>

      <TextField
        variant={"outlined"}
        defaultValue={price}
        type={"number"}
        color={"secondary"}
        label={"Price"}
        onChange={(e) => {
          component.setPrice(Number(e.target.value));
          updateParent(component, index);
        }}
      />

      {
        isChoice &&
        <Button
          variant={"contained"}
          onClick={() => {
            component.addEmptyChoice();
            updateParent(component, index);
            repaint();
          }}
        >
          + Choice
        </Button>
      }

      {
        isChoice &&
        emChoices
      }

    </div>
  )
}


export default ComponentDisplay;
