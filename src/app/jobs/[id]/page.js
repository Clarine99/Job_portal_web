
import Layout from "../../../jobbee-components/src/components/layout/Layout";
import Home from "../../../jobbee-components/src/components/Home"; // Import the Home component
import JobItem from "../../../jobbee-components/src/components/job/JobItem";
import JobDetails from "../../../jobbee-components/src/components/job/JobDetails";
export default async function Page({ params }) {
  console.log('Server params:', params); // Debug: Log params

  const { id } = await  params;
  console.log('Server ID ...:', id); // Debug: Log the job ID
  if (!id) {
    return <div>Error: Job ID is missing</div>;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}/`, {
      cache: "no-store",
    });
    console.log('Server response:', res.status); // Debug: Log the response
    if (!res.ok) {
      const errorData = await res.json(); // Log the error response from the API
      console.error('API Error:', errorData);
      throw new Error(`Failed to fetch job data: ${res.statusText}`);
    }

    const responseData = await res.json();
    console.log('API Response:', responseData); // Debug: Log the full response

    const { job = {}, candidates = [] } = responseData || {};
    console.log('Job data:', job); // Debug: Log the job data

    return (
      <Layout>
        <JobDetails job={job} candidates={candidates} />
      </Layout>
    );
  } catch (error) {
    console.error('Error fetching job data:', error.message);
    return <div>Error: {error.message}</div>;
  }
}