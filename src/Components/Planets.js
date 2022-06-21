import React, { useState } from 'react';
import { useQuery, usePaginatedQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (page) => {

    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}


const Planets = () => {
    const [page, setPage] = useState(1);
   /*  const { data, status} = useQuery(['planets', page], () => fetchPlanets(page)); */

  
   

   const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData
  } = useQuery(['users', page], () => fetchPlanets(page), { keepPreviousData: true });


  /*  const {
        resolvedData,   
        latestData,
        status
    } = usePaginatedQuery(['planets', page], () => fetchPlanets(page)); */  /* deprecated!!!!!!!! */
   
   if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

return (
 <div>

      <h2>Planets</h2>
       
      <button 
            onClick={() => setPage(page => Math.max(page - 1, 1))} 
            disabled={page === 1}>
            Previous Page
          </button>
          <span>{ page }</span>
          <button 
            onClick={() => setPage(prevState => prevState + 1)} 
            disabled={page ===6}>
            
            Next page
          </button>

      {data && (
        <div>
          {data?.results?.map(planet => <Planet key={planet.name} planet={planet}/>)}
        </div>
      )}

      <div>{isFetching ? 'Fetching...' : null}</div>
    </div>
)
   
    /* return (
        <div>
            <h2>Planets</h2>


             { status === 'loading' && (
                <div>Loading data...</div>
            )}


            { status === 'error' && (
                <div>Error fetching data</div>
            )}

            { status === 'success' && (
                <div>
                    {resolvedData.results.map(planet => <Planet key={planet.name} planet={planet}/>)}
                </div>
            )} 
        </div>
    ) */
}
export default Planets;