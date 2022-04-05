import {FC, useContext, useState} from "react";
import React from "react";
import {ProductComponent, ProductComponentPriceType} from "../../libs/dataUtils";
import firebase from "firebase/compat";
import {Button, Checkbox, MenuItem, Select, TextField} from "@mui/material";
import {LanguageContext} from "../../libs/context";
import {LanguageProvider} from "../../libs/language";

interface ComponentDisplayProps {
  component: ProductComponent,
  onUpdate: Function,
  index: number
}


const ComponentDisplay = (props: ComponentDisplayProps) => {
  const [updater, setUpdater] = useState(0);

  const {language} = useContext(LanguageContext);
  const langProvider = new LanguageProvider(language);

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
  let description = component.getDescription();
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
        let choiceCond = choice.cond;

        if (choiceCond === null) choiceCond = 0;

        const em =
          <div className={"edit-component-sub"}>
            <TextField
              variant={"outlined"}
              label={langProvider.getText("Products.Edit.Name")}
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
              label={langProvider.getText("Products.Edit.Components.Price")}
              color={"secondary"}
              defaultValue={choicePrice}
              type={"number"}
              onChange={(e) => {
                choice.price = Number(e.target.value);
                component.setChoice(choice, i);
                updateParent(component, index);
              }}
            />
            <TextField
              variant={"outlined"}
              label={"COND"}
              color={"secondary"}
              defaultValue={choiceCond}
              type={"number"}
              onChange={(e) => {
                choice.cond = Number(e.target.value);
                component.setChoice(choice, i);
                updateParent(component, index);
              }}
            />
            <p>Address: {component.getAddress()}</p>
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
        label={langProvider.getText("Products.Edit.Name")}
        color={"secondary"}
        defaultValue={name}
        onChange={(e) => {
          component.setName(e.target.value);
          updateParent(component, index);
        }}
      />

      <TextField
        variant={"outlined"}
        label={langProvider.getText("Products.Edit.Description")}
        color={"secondary"}
        defaultValue={description}
        onChange={(e) => {
          component.setDescription(e.target.value);
          updateParent(component, index);
        }}
      />

      <Select
        label={langProvider.getText("Products.Edit.Components.Type")}
        defaultValue={type}
        color={"secondary"}
        onChange={(e) => {
          // @ts-ignore
          component.setType(e.target.value);
          updateParent(component, index);
          repaint();
        }}
      >
        <MenuItem value={"choice"}>{langProvider.getText("Products.Edit.Components.Types.Choice")}</MenuItem>
        <MenuItem value={"amount"}>{langProvider.getText("Products.Edit.Components.Types.Amount")}</MenuItem>
        <MenuItem value={"addon"}>{langProvider.getText("Products.Edit.Components.Types.Addon")}</MenuItem>
      </Select>

      <TextField
        variant={"outlined"}
        label={langProvider.getText("Products.Edit.Components.Price")}
        color={"secondary"}
        onChange={(e) => {
          component.setPrice(e.target.value as ProductComponentPriceType);
          updateParent(component, index);
        }}
      />

      <div>
        <Checkbox
          color={"secondary"}
          defaultChecked={component.isRequired()}
          onChange={(e) => {
            const result = e.target.checked;
            component.setRequired(result);
            updateParent(component, index);
          }}
        />
        {langProvider.getText("Products.Edit.Components.Required")}
      </div>

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
          {langProvider.getText("Products.Edit.Components.AddChoice")}
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
