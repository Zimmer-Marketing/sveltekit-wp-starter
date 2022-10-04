import { postsPerPage, wpGraphqlEndpoint } from "$lib/setup/config.json";

const wpGraphql = async ({
  query_id,
  category = "",
  offset = 0,
  variables,
}) => {
  const limit = postsPerPage;

  // get cursor
  let cursor = "";
  if (offset !== null && offset > 0) {
    // get cursors up until offset
    var queryCursor = `
		{
			posts(first: ${offset}) {
			edges {
					cursor
				}
			}
		}
		`;
    const resCursors = fetch(wpGraphqlEndpoint + "?query=" + queryCursor)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        return response.data.posts.edges;
      });
    // we need the last cursor on the list
    // https://graphql.org/learn/pagination/#pagination-and-edges
    const cursors = await resCursors;
    cursor = cursors[cursors.length - 1].cursor;
  }

  // get category
  let queryCategory = "";
  if (category !== null) {
    queryCategory = `
    , where: {categoryName: "${category}"}
    `;
    //console.log(`${category}`)
  }

  // get full graphql query with query_id
  let query = "";
  switch (query_id) {
    case "primary_menu":
      query = `
        query GET_MENU_BY_NAME {
          menu(id: "Primary", idType: NAME) {
            menuItems(first: 100) {
              nodes {
                key: id
                title: label
                url
                cssClasses
                target
                parentId
                path
              }
            }
          }
        }`;
      break;
    case "route":
      query = `
        {
          nodeByUri(uri: "${variables}") {
            ... on Page {
              pageId
              content
              excerpt
              title
              futuriPostId
              ssGuid
            }
            ... on Post {
              postId
              futuriPostId
              ssGuid
              content
              date
              excerpt
              title
              author {
                node {
                  name
                }
              }
              categories {
                nodes {
                  name
                }
              }
              featuredImage {
                node {
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
        `;
      break;
    case "post":
      query = `
            query getPostBySlug($slug: ID!) {
              post(id: $slug, idType: SLUG) {
                  databaseId
            slug
            uri
                date
                title
                content
                author {
                  node {
                    name
                  }
                }
                categories {
                  nodes {
                    name
                  }
                }
                featuredImage {
                  node {
                    sourceUrl
                    altText
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
            `;
      break;
    case "posts":
      query = `
            {
                posts(first: ${limit}, after: "${cursor}" ${queryCategory} ) {
                    edges {
                      cursor
                      node {
                        content,
                        date,
                        excerpt,
                        postId,
                        slug,
                        title,
                        uri,
                        featuredImage {
                          node {
                            sourceUrl
                          }
                        }
                        categories(first: 1) {
                          nodes {
                            name
                          }
                        }
                      }
                    }
                  }
            }
            `;
      break;
    case "posts_total":
      query = `
            {
                posts {
                    pageInfo {
                        total
                    }
                }
            }
            `;
      break;
    case "sitemap":
      query = `
      {
        posts(first: 1000) {
          edges {
            node {
              title,
              uri
            }
          }
        }
        pages(first: 1000) {
          edges {
            node {
              title,
              uri
            }
          }
        }
        shows(first: 1000) {
          edges {
            node {
              title,
              uri
            }
          }
        }
      }
              `;
      break;
  }

  // Build query string.
  //	var queryString = '?query=' + query;

  // Combine the endpoint with the query string.
  //	var fetchUrl = wpGraphqlEndpoint + queryString;

  // Fetch the url.
  const response = fetch(wpGraphqlEndpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        slug: variables,
      },
    }),
  })
    // When the promise resolves return the response as parsed json.
    .then(function (response) {
      return response.json();
    });
  //console.log(query)
  return response;
};

export default wpGraphql;
