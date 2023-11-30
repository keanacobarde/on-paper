import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function Popup({
  buttonType, buttonName, formTitle, formContent,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      { buttonType === 'edit' ? (
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditNoteIcon />
        </IconButton>
      ) : (
        <Button variant="contained" onClick={handleClickOpen}>
          {buttonName}
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          {formContent}
        </DialogContent>
      </Dialog>
    </>
  );
}

Popup.propTypes = {
  buttonType: PropTypes.string,
  buttonName: PropTypes.string,
  formTitle: PropTypes.string.isRequired,
  formContent: PropTypes.element.isRequired,
};

Popup.defaultProps = {
  buttonType: '',
  buttonName: '',
};
