import React from 'react';
import CardComponent from '../components/CardComponent';
import Masonry from '@mui/lab/Masonry';
import { Box, Container } from '@mui/system';

const CardGrid = ({ jobListings, onCardClick }) => {
  const cardItemStyle = {
    padding: 1,
  };

  function getBorderColor(index) {
    const colors = ['#f0df46', '#f5a65d', '#09bab7'];
    return colors[index % 3];
  }

  // Filter out job listings with "Closed" or "Deleted" jobStatus
  const filteredJobListings = jobListings.filter(
    (job) => job.jobStatus !== 'Closed' && job.jobStatus !== 'Deleted'
  );

  return (
    <Container
      sx={{
        justifyContent: 'center',
        minHeight: 393,
      }}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={0}>
        {filteredJobListings.map((job, index) => (
          <Box key={index} sx={{ ...cardItemStyle, height: 'auto' }}>
            <CardComponent
              job={job}
              onCardClick={onCardClick}
              borderColour={getBorderColor(index)}
            />
          </Box>
        ))}
      </Masonry>
    </Container>
  );
};

export default CardGrid;
