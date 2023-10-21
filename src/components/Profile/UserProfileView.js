import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  Tab,
} from '@mui/material';

import HelpIcon from '@mui/icons-material/Help';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import StarIcon from '@mui/icons-material/Star';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import {
  ElectricalServices,
  LocalFlorist,
  LocalShipping,
  Palette,
  Build,
} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import UserReview from '../Job/UserReviews';

const jobData = {
  JobName: 'Job Name',
  Deadline: 'dealine date',
  Amount: '$Amount',
};

const hasListedJob = true;

const JobCard = ({ data, iconComponent }) => {
  return (
    <>
      <Card sx={{ margin: '10px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          {iconComponent}
          <Typography variant="h6" sx={{ marginLeft: '20px' }}>
            {data.JobName}
          </Typography>
        </CardContent>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
            <CalendarMonthIcon style={{ marginRight: '0.5rem' }} />
            <Typography>{data.Deadline}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PaidIcon style={{ marginRight: '0.5rem' }} />
            <Typography>{data.Amount}</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const UserProfileView = (job) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [value, setValue] = useState('1');
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    // Fetch reviews for the user with ID 20
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/review/user/${job.job.user_id}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch job reviews.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Call the async function to fetch data
    fetchData();
  }, [job.job.user_id]);

  console.log(job.job.user_id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch user data
    fetch(`/api/users/${job.job.user_id}/profile`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={
        isSmallScreen
          ? {
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }
          : { display: 'flex', justifyContent: 'center', padding: '2rem' }
      }>
      <Container sx={{ margin: '20px' }}>
        <Card
          sx={
            isSmallScreen
              ? {
                  borderRadius: '9px',
                  padding: '1rem',
                  maxWidth: '600px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              : {
                  borderRadius: '9px',
                  padding: '1rem',
                  width: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'fixed',
                }
          }>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
              {user?.username}
            </Typography>
            <Avatar
              src={`/avatars/avatar_${user?.profile.avatar}.jpg`}
              sx={
                isSmallScreen
                  ? { width: '100px', height: '100px', marginBottom: '20px' }
                  : { width: '200px', height: '200px', marginBottom: '20px' }
              }
            />
            <Box sx={{ display: 'flex', marginTop: '20px' }}>
              <Typography
                variant={isSmallScreen ? 'body2' : 'body1'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: isSmallScreen ? '20px' : '0',
                }}>
                <StickyNote2Icon
                  sx={{ fontSize: 'medium', marginRight: '5px' }}
                />
                {reviews.length} Reviews
              </Typography>

              <Typography
                variant={isSmallScreen ? 'body2' : 'body1'}
                sx={{
                  display: 'flex',
                  alignItems: 'center', // Align icons and text vertically
                  marginLeft: '5px',
                }}>
                <StarIcon sx={{ fontSize: 'medium', marginRight: '5px' }} />
                {reviews.reduce((total, review) => total + review.rating, 0) /
                  reviews.length}{' '}
                Rating
              </Typography>
            </Box>

            <Typography
              variant={isSmallScreen ? 'body2' : 'body1'}
              sx={
                isSmallScreen
                  ? { marginRight: '20px', whiteSpace: 'nowrap' }
                  : {}
              }>
              {user?.profile?.createdAt
                ? `Joined ${new Date(
                    user.profile.createdAt,
                  ).getDate()}${getDaySuffix(
                    new Date(user.profile.createdAt).getDate(),
                  )} ${
                    months[new Date(user.profile.createdAt).getMonth()]
                  } ${new Date(user.profile.createdAt).getFullYear()}`
                : ''}
            </Typography>
          </CardContent>
        </Card>
        {isSmallScreen && <Divider light sx={{ marginTop: '40px' }} />}
      </Container>
      <Container>
        <Typography variant={isSmallScreen ? 'h6' : 'h4'} gutterBottom>
          <strong>Hi, I am {user?.username}</strong>
        </Typography>
        <Typography variant="subtitle1" fontFamily="roboto" gutterBottom>
          {user?.profile?.bio}
        </Typography>
        <Divider light />
        <Box component="div" sx={{ marginTop: '30px' }}>
          <Typography variant="h5" gutterBottom>
            <strong>{user?.username}'s Listings</strong>
          </Typography>
          {hasListedJob ? (
            <Box sx={{ overflow: 'auto', height: '300px' }}>
              <JobCard data={jobData} iconComponent={<HelpIcon />} />
              <JobCard data={jobData} iconComponent={<HelpIcon />} />
              <JobCard data={jobData} iconComponent={<HelpIcon />} />
            </Box>
          ) : (
            <Typography variant="h6">
              {user?.username} hasn't listed any jobs
            </Typography>
          )}
        </Box>

        <Box component="div" sx={{ marginTop: '30px' }}>
          <Typography variant="h5" gutterBottom>
            <strong>Job Completed</strong>
          </Typography>
          <Box sx={{ display: 'flex', marginTop: '20px' }}>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}>
              <ElectricalServices fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}>
              <LocalFlorist fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}>
              <LocalShipping fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}>
              <Palette fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}>
              <Build fontSize="inherit" /> +1
            </Typography>
          </Box>
        </Box>
        <Box component="div" sx={{ marginTop: '30px' }}>
          <Typography variant="h5" gutterBottom>
            <strong>Reviews</strong>
          </Typography>
          <Box>
            <TabContext value={value}>
              <Box>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example">
                  <Tab label="From Clients" value="1" />
                  <Tab label="From Workerso" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {reviews
                  .filter((review) => review.type === 'Client')
                  .map((review) => (
                    <UserReview
                      key={review.id}
                      reviewUserName={review.Job.User.username}
                      date={review.createdAt}
                      review={review.reviewText}
                      rating={review.rating}
                    />
                  ))}
              </TabPanel>
              <TabPanel value="2">
                {reviews
                  .filter((review) => review.type === 'Worker')
                  .map((review) => (
                    <UserReview
                      key={review.id}
                      reviewUserName={review.Job.User.username}
                      date={review.createdAt}
                      review={review.reviewText}
                      rating={review.rating}
                    />
                  ))}
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default UserProfileView;
