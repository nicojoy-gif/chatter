import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

function AnalyticsView() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize the gapi client with your Google Analytics 4 property ID
        gapi.load("client", async () => {
          try {
            // Initialize the Google API client
            await gapi.client.init({
              apiKey: "AIzaSyCTaDImAZu8RW7Sv5d3TUg4hyqr6zeElNo",
              clientId:  "998694842602-ofo43avidduql3k6p2mmka7k568bquvo.apps.googleusercontent.com",
              discoveryDocs: [
                "https://analyticsreporting.googleapis.com/$discovery/rest?version=v4",
              ],
              scope: "https://www.googleapis.com/auth/analytics.readonly",
            });

            // Make a request to the Google Analytics Data API
            const response = await gapi.client.analyticsreporting.reports.batchGet({
              requestBody: {
                reportRequests: [
                  {
                    viewId: "G-EB35D3JBV4",
                    dateRanges: [
                      {
                        startDate: "30daysAgo",
                        endDate: "today",
                      },
                    ],
                    metrics: [
                      { expression: "ga:users" },
                      { expression: "ga:sessions" },
                    ],
                  },
                ],
              },
            });

            // Set the analytics data in state
            setAnalyticsData(response.result.reports[0].data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching analytics data:", error);
            setError("Error fetching analytics data");
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error initializing gapi client:", error);
        setError("Error initializing gapi client");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const metrics = analyticsData?.totals[0]?.values;

  // Render the analytics data
  return (
    <div>
      <h2>Analytics Data</h2>
      <p>Number of Users: {metrics[0]}</p>
      <p>Number of Sessions: {metrics[1]}</p>
    </div>
  );
  // Render the analytics data here
  
}

export default AnalyticsView;
