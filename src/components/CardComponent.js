import React from 'react'; // Import useState

import {
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
  Grid,
  Divider,
  Box,
} from '@mui/material';
import {
  Favorite,
  CalendarMonth,
  Paid,
  ElectricalServices,
  LocalFlorist,
  LocalShipping,
  LocationOn,
  Build,
} from '@mui/icons-material';
import useJobSave from './useJobSave';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import { getLocationName } from '../components/Job/JobDetails';
import SaveButton from '../components/Job/SaveButton';

const cardStyle = {
  mt: 2,
  mb: 2,
  border: '1px solid',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: { xs: '80vw', sm: '40vw', md: '28vw', lg: '18vw', xl: '280px' },
};

const itemStyle = {
  display: 'flex',
  alignItems: 'centre',
};

function getIconByCategoryId(categoryId) {
  const iconSize = 'large';

  switch (categoryId) {
    case 1:
      return <ElectricalServices fontSize={iconSize} />;
    case 2:
      return <LocalFlorist fontSize={iconSize} />;
    case 3:
      return <LocalShipping fontSize={iconSize} />;
    case 4:
      return <FormatPaintIcon fontSize={iconSize} />;
    case 5:
      return <Build fontSize={iconSize} />;
    default:
      return null;
  }
}

function getColourByAmount(amount) {
  if (amount < 500) {
    return '#f0df46';
  } else if (amount >= 500 && amount < 1000) return '#f5a65d';
  else if (amount >= 1000 && amount < 1500) return '#09bab7';
  else if (amount >= 1500 && amount < 2000) return '#9379a8';
  else return '#ab5546';
}

const CardComponent = ({ job, onCardClick }) => {
  const iconComponent = getIconByCategoryId(job.category_id);
  const borderColour = getColourByAmount(job.paymentAmount);
  const { isSaved, toggleSaved } = useJobSave(job.id);

  return (
    <Card sx={{ ...cardStyle, borderColor: borderColour }}>
      <CardHeader
        onClick={() => onCardClick(job)}
        subheader={
          <Grid container direction="column">
            <Grid item container justifyContent="space-between">
              <Grid item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {iconComponent}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      fontWeight: 600,
                      color: 'rgba(20, 8, 14, 1)',
                      marginLeft: '5px',
                    }}>
                    {job.title}
                  </Typography>
                </div>
                <Divider
                  variant="fullwidth"
                  light
                  sx={{ marginTop: '10px', bgcolor: borderColour }}
                />
              </Grid>
            </Grid>
          </Grid>
        }
        sx={{
          color: 'textSecondary',
          cursor: 'pointer',
        }}
      />
      <CardContent sx={{ marginLeft: '5px', marginRight: '5px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'centre',
            marginBottom: '5px',
            marginTop: '-20px',
          }}>
          <Tooltip title="Deadline">
            <LocationOn style={{ marginRight: '0.5rem' }} />
          </Tooltip>
          <Typography variant="body2">
            {' '}
            {getLocationName(job.location_id)}
          </Typography>
        </Box>
        <Box sx={{ ...itemStyle, marginBottom: '20px' }}>
          <Tooltip title="Deadline">
            <CalendarMonth style={{ marginRight: '0.5rem' }} />
          </Tooltip>
          <Typography variant="body2">{job.deadline}</Typography>
        </Box>
        <Typography variant="body1">{job.description}</Typography>
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'centre',
            justifyContent: 'space-between',
          }}>
          {/* <Grid item xs={8}> */}
          <Box sx={itemStyle}>
            <Tooltip title="Will get paid">
              <Paid
                style={{
                  marginRight: '0.5rem',
                  fontSize: '3rem',
                  color: borderColour,
                }}
              />
            </Tooltip>
            <Typography variant="body2" sx={{ fontSize: '2rem' }}>
              {Math.round(job.paymentAmount)}
            </Typography>
          </Box>
          {/* </Grid>

          <Grid item xs={4}> */}

          <SaveButton isSaved={isSaved} jobId={job.id} toggleSaved={toggleSaved} />

          {/* </Grid> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
