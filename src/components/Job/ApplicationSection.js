import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ApplyButton from './ApplyButton';
import { RenderApplicantsList } from './ApplicationList';

const ApplicationsSection = ({ job, isOwner }) => {
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApplicationSubmitted = (message) => {
    setApplicationResult(message);
    setIsDialogOpen(true);
  };

  const handleShowApplicants = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
  };

  const [applicationResult, setApplicationResult] = useState({
    success: true,
    message: '',
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="body1"
        sx={{ marginTop: '20px', marginBottom: '10px', fontWeight: 'bold' }}
        color="#BC4B51"
      >
        Number of Applicants: {job.Applications?.length}
      </Typography>

      {job ? (
        isOwner ? (
          <Accordion expanded={isAccordionExpanded} onChange={() => {}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={handleShowApplicants}
              sx={{
                bgcolor: 'primary.main',
              }}
            >
              <Typography>Applicants</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                bgcolor: 'primary.main',
                fontFamily: 'Roboto',
              }}
            >
              <RenderApplicantsList job={job} />
            </AccordionDetails>
          </Accordion>
        ) : (
          <ApplyButton
            job={job}
            onApplicationSubmitted={handleApplicationSubmitted}
          />
        )
      ) : (
        <p>Loading...</p>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Application Result</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{applicationResult.message}</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ApplicationsSection;
