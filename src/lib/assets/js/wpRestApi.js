const wpRestApi = async (endpointId) => {
  // get full graphql query with query_id
  let endpoint = "";
  switch (endpointId) {
    case "localNewsPosts":
      endpoint = "https://newstalkkzrg.com/wp-json/kzrg/v1/news-posts";
      break;
    case "blabPosts":
      endpoint = 'https://wp.bigdog979.com/wp-json/kxdg/v1/blab';
      break;
  }

  // Fetch the url.
  const response = await fetch(endpoint);
  const data = await response.json();
  //console.log(data);

  return data;
};

export default wpRestApi;
