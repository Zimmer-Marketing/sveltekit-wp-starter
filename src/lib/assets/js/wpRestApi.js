const wpRestApi = async (endpointId) => {
  // get full graphql query with query_id
  let endpoint = "";
  switch (endpointId) {
    case "localNewsPosts":
      endpoint = "Your Endpoint here";
      break;
    case "blabPosts":
      endpoint = 'Your endpoint here';
      break;
  }

  // Fetch the url.
  const response = await fetch(endpoint);
  const data = await response.json();
  //console.log(data);

  return data;
};

export default wpRestApi;
