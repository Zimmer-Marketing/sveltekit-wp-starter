import wpGraphql from './wpGraphql';

const fetchSingleWpRoute = async (id) => {

	const options = {
    query_id: 'route',
    variables: id
  }
  
	const resRoute = await wpGraphql(options)
  
    const route  = await resRoute;
            
    return{
        route
    }
    
} 


export default fetchSingleWpRoute