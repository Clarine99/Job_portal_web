import Layout from '../jobbee-components/src/components/layout/Layout';
import Home from '../jobbee-components/src/components/Home';


export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/`, {
    cache: 'no-store', // Ensures fresh data on each request
  });
  const data = await res.json();
 
  return (
    <Layout>
      <Home data={data}/>
        
    </Layout>
  );
}
