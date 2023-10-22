import React, { useState } from 'react';
import { IconButton, Badge, Dialog, Grow } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import Email from '../../pages/Email';

const styles = {
  mailMenu: {
    position: 'relative',
  },
  badge: {
    '& .MuiBadge-badge': {
      backgroundColor: 'red',
      color: 'white',
    },
  },
};

function MailMenu() {
  const [isMessageOpen, setMessageOpen] = useState(false);

  const handleMailOpen = () => {
    setMessageOpen(true);
  };

  const closeMessageDialog = () => {
    setMessageOpen(false);
  };

  return (
    <div style={styles.mailMenu}>
      <IconButton
        size="large"
        aria-label="show new mails"
        color="inherit"
        onClick={handleMailOpen}
        sx={styles.badge}
      >
        <Badge badgeContent={0} color="error">
          <MailIcon />
        </Badge>
      </IconButton>

      <Dialog
        open={isMessageOpen}
        onClose={closeMessageDialog}
        TransitionComponent={Grow}
        transitionDuration={500}
        sx={{ height: '100vh' }}
      >
        <Email onClose={closeMessageDialog} />
      </Dialog>
    </div>
  );
}

export default MailMenu;
