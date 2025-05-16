Goal: Create a modern, responsive Next.js application that leverages Observable Plot to visualize data on local tech organizations from the specified GitHub repository.

Core Functionality:
  
  1.  Data Ingestion:
  * Fetch and process JSON data from https://github.com/mrfright/cleveland-tech.
* Implement initial data loading on application start.

2.  Organization Directory (/organizations):
  * Display a list of all tech organizations with name, industry, and description (if available).
* Implement basic filtering by industry.

3.  Interactive Dashboard (/dashboard):
  * Visualize 2-3 key metrics using Observable Plot, focusing on insights relevant to a tech conference (e.g., organization distribution by industry, event trends if data allows).
* Create responsive bar charts, line charts (if applicable), or scatter plots (if applicable).
* Implement basic tooltips on hover for data points in the visualizations.

Technical Implementation:
  
  1.  Next.js (App Router):
  * Set up a new Next.js project using the `app` router.
* Create page routes for the organization directory (`/organizations`) and the dashboard (`/dashboard`).
* Implement a responsive layout using CSS Modules or Tailwind CSS.

2.  Data Handling:
  * Fetch data using `fetch`.
* Create utility functions to parse and transform the JSON data for use in the application and Observable Plot.
* Manage application state using `useState` and `useEffect` or React Context API to share processed data.

3.  Observable Plot Integration:
  * Install `@observablehq/plot`.
* Create React components within the `/app/dashboard` route that use the `Plot` function to generate interactive visualizations based on the processed data.
* Ensure the plots are responsive.

4.  Styling:
  * Implement a clean and modern visual design.
* Ensure responsiveness across desktop, tablet, and mobile devices.

User Experience:
  
  1.  Navigation: Implement clear navigation between the organization directory and the dashboard.
2.  Visual Clarity: Ensure the visualizations are easy to understand and provide clear insights.
3.  Responsiveness: The application should be fully responsive.

Success Metrics:
  
  * The application successfully fetches and processes data from the GitHub repository.
* The organization directory displays a list of organizations with basic information and industry filtering.
* The dashboard renders 2-3 responsive and interactive visualizations using Observable Plot.
* The application is responsive and visually appealing.

Out of Scope (for MVP):
  
  * Advanced filtering or search functionality.
* User authentication or authorization.
* Data editing or contribution features.
* Integration with external APIs beyond the initial data source.
* Highly complex or numerous visualizations.
* Detailed individual organization pages.

Please generate the code for this Next.js application.