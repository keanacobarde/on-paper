import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { Dialog, DialogContent } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup({ buttonName, formTitle, formContent }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        {buttonName}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          {formContent}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Popup.propTypes = {
  buttonName: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
  formContent: PropTypes.element.isRequired,
};
