import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import dotenv from 'dotenv';
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID;

const GoogleCalendarIntegration = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: "YOUR_API_KEY",
        clientId: CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.readonly",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      const auth = gapi.auth2.getAuthInstance();
      if (auth.isSignedIn.get()) {
        const user = auth.currentUser.get();
        console.log("User signed in: ", user.getBasicProfile().getName());
        listUpcomingEvents();
      }
    });
  };

  const listUpcomingEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        console.log("Upcoming Events:", events);
      });
  };

  return (
    <div>
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
        Connect to Google Calendar
      </button>
    </div>
  );
};

export default GoogleCalendarIntegration;
