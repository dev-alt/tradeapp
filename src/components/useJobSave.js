import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Import useAuth to get the user ID
import Cookies from 'js-cookie';

function useJobSave(jobId) {
  const { profile } = useAuth(); // Get the user's profile from the AuthContext
  const [isSaved, setIsSaved] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    // Make an initial request to the server to check if the job is saved
    const checkSavedStatus = async () => {
      try {
        const response = await fetch(
          `/api/users/${profile.profile.UserId}/checkSavedJob/${jobId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setIsSaved(data.isSaved);
        } else {
          console.error(`Failed to check saved status for job ${jobId}`);
        }
      } catch (error) {
        console.error(
          `An error occurred while checking saved status for job ${jobId}:`,
          error,
        );
      }
    };

    checkSavedStatus();
  }, [profile.profile.UserId, jobId, token]);

  const toggleSaved = async () => {
    // Prepare the request data
    const requestData = {
      method: isSaved ? 'DELETE' : 'POST', // Use DELETE to unsave and POST to save
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      if (isSaved) {
        // Send the DELETE request to unsave
        const response = await fetch(
          `/api/users/${profile.profile.UserId}/unsaveJob/${jobId}`,
          requestData,
        );
        if (response.ok) {
          console.log(`Job ${jobId} unsaved`);
          setIsSaved(false); // Update the isSaved state to false after a successful unsave
        } else {
          console.error(`Failed to unsave job ${jobId}`);
        }
      } else {
        // Send the POST request to save
        const response = await fetch(
          `/api/users/${profile.profile.UserId}/saveJob/${jobId}`, // Use profile.id as the userId
          requestData,
        );
        if (response.ok) {
          console.log(`Job ${jobId} saved`);
          setIsSaved(true); // Update the isSaved state to true after a successful save
        } else {
          console.error(`Failed to save job ${jobId}`);
        }
      }
    } catch (error) {
      console.error(
        `An error occurred while ${isSaved ? 'unsaving' : 'saving'} the job:`,
        error,
      );
    }
  };

  return {
    isSaved,
    toggleSaved,
  };
}

export default useJobSave;
