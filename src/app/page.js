import axios from 'axios';
import Layout from '../jobbee-components/src/components/layout/Layout';
import Home from '../jobbee-components/src/components/Home';





export default async function Page() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/`, { cache: "no-store", })
    console.log('res',res)

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return (
      <Layout>
        <Home data={data} />
      </Layout>
    );
  }
  catch (error) {
    console.error('Error fetching data:', error.message);
  
  }
}

