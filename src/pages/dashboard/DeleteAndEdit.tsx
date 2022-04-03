import {archiveAllFromItem, Client, Contract, deleteFromFirestore, Product} from "../../libs/dataUtils";
import {Delete, Edit} from "@mui/icons-material";
import React, {useContext, useState} from "react";
import {LanguageContext, UserContext} from "../../libs/context";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {LanguageProvider} from "../../libs/language";

export interface DeleteAndEditProps {
  editLink: string
  toDelete: Contract | Product | Client,

}


export default (props: DeleteAndEditProps) => {

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const link = props.editLink;
  const toDelete = props.toDelete;

  const {user} = useContext(UserContext)
  const {language} = useContext(LanguageContext);
  const langProvider = new LanguageProvider(language);

  const del = () => {
    deleteFromFirestore(toDelete, user);
  }

  return (
    <div>
      <div style={{
        display: "flex",
        flexFlow: "row"
      }}>
        <Edit onClick={() => {
          window.location.assign(link);
        }}/>

        <Delete onClick={() => {
          setShowDeleteDialog(true);
        }}/>
      </div>


      {
        toDelete instanceof Contract &&
        <Dialog open={showDeleteDialog}>
          <DialogTitle>
            {langProvider.getText("Dashboard.Delete.Title")}
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              {langProvider.getText("Dashboard.Delete.Description")}
            </DialogContentText>
          </DialogContent>


          <DialogActions>
            <Button
              variant={"contained"}
              color={"warning"}
              onClick={() => {
                del();
                setShowDeleteDialog(false);
              }}
            >
              {langProvider.getText("Dashboard.Delete.Buttons.Delete")}
            </Button>

            <Button
              variant={"contained"}
              color={"secondary"}
              onClick={() => {
                setShowDeleteDialog(false);
              }}
            >
              {langProvider.getText("Dashboard.Delete.Buttons.Cancel")}
            </Button>
          </DialogActions>
        </Dialog>
      }

      {
        !(toDelete instanceof Contract) &&
        <Dialog open={showDeleteDialog}>
          <DialogTitle>
            {langProvider.getText("Dashboard.DeleteArchive.Title")}
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              {langProvider.getText("Dashboard.DeleteArchive.Message")}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              variant={"contained"}
              color={"warning"}

              onClick={() => {
                del();
                setShowDeleteDialog(false);
              }}
            >
              {langProvider.getText("Dashboard.DeleteArchive.Buttons.DeleteAnyway")}
            </Button>

            <Button
              variant={"contained"}
              color={"warning"}

              onClick={() => {
                toDelete.isBeingUsed(user).then((result) => {
                  if (!result) return;

                  archiveAllFromItem(toDelete, user).then(() => {
                    del();
                    setShowDeleteDialog(false);
                  })
                });
              }}
            >
              {langProvider.getText("Dashboard.DeleteArchive.Buttons.ArchiveAll")}
            </Button>

            <Button
              variant={"contained"}
              color={"warning"}

              onClick={() => {
                setShowDeleteDialog(false);
              }}
            >
              {langProvider.getText("Dashboard.DeleteArchive.Buttons.Cancel")}
            </Button>
          </DialogActions>
        </Dialog>
      }


    </div>
  )

}
