import React, {useState} from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async (page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
    return res.json();
}

const People = () => {

  const [page, setPage] = useState(1);
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData
  } = useQuery(['users', page], () => fetchPeople(page), { keepPreviousData: true });

  /* const { data, status } = useQuery('people', fetchPeople); */
  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  /* return (
    <div>
      <h2>People</h2>

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <div>
          { data.results.map(person => <Person key={person.name} person={person} /> ) }
        </div>
      )} 
    </div>
  ); */

  return (
    <div>
   
         <h2>People</h2>
          
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
             {data?.results?.map(person => <Person key={person.name} person={person}/>)}
           </div>
         )}
   
         <div>{isFetching ? 'Fetching...' : null}</div>
       </div>
  )
}
 
export default People;