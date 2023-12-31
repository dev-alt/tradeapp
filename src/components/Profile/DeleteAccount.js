import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const DeleteAccount = () => {
  return (
    <Card>
      <CardHeader title="Delete Account" />
      <CardContent></CardContent>
      <CardActions>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default DeleteAccount;
