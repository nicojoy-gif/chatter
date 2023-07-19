import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

function AnalyticsView() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize the gapi client with your Google Analytics 4 property ID
        gapi.load("client", () => {
          // Initialize the Google API client
          gapi.client
            .init({
              apiKey: "AIzaSyCTaDImAZu8RW7Sv5d3TUg4hyqr6zeElNo",
              clientId:
                "998694842602-ofo43avidduql3k6p2mmka7k568bquvo.apps.googleusercontent.com",
              discoveryDocs: [
                "https://analyticsreporting.googleapis.com/$discovery/rest?version=v4",
              ],
              plugin_name: "PLUGIN",
              scope: "https://www.googleapis.com/auth/analytics.readonly",
            })
            .then(() => {
              // Make a request to the Google Analytics Data API
              gapi.client.analyticsreporting.reports
                .batchGet({
                  requestBody: {
                    reportRequests: [
                      {
                        viewId: "G-9LNPEENX44",
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
                })
                .then((response: any) => {
                  // Set the analytics data in state
                  console.log(response);
                  setAnalyticsData(response.result.reports[0].data);
                })
                .catch((error: any) => {
                  console.error("Error fetching analytics data:", error);
                  setAnalyticsData(analyticsData);
                });
            });
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, [analyticsData]);
}

export default AnalyticsView;
