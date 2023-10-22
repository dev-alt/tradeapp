import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const JobDescription = ({ job, isSmallScreen }) => {
  return (
    <Grid item xs={12} md={8}>
      <Box>
        <Box>
          <Typography
            variant={isSmallScreen ? 'body1' : 'h6'}
            sx={{ marginLeft: '20px', marginRight: '20px' }}
          >
            {job ? job.description : ''}
          </Typography>
          <Typography
            variant={isSmallScreen ? 'body1' : 'h6'}
            sx={{
              marginLeft: '20px',
              marginRight: '20px',
              marginTop: '40px',
            }}
          >
            <strong>Details </strong>
            <br />
            {job ? job.details : ''}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default JobDescription;
