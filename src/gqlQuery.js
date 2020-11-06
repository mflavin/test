export const shortQuery = `{
  cities {
    createdAt
    id
    name
    type
    updatedAt
    country {
      cities {
        createdAt
        id
        name
        type
        updatedAt
      }
      createdAt
      id
      isoCode
      name
      type
      updatedAt
      jobs {
        applyUrl
        commitment {
          id
          createdAt
          title
          updatedAt
        }
        company {
          createdAt
          emailed
          id
          logoUrl
          name
          twitter
          updatedAt
          websiteUrl
        }
        description
        id
        isFeatured
        isPublished
        locationNames
        postedAt
        title
        updatedAt
        userEmail
      }
    }
    jobs {
      applyUrl
      createdAt
      description
      id
      isFeatured
      isPublished
      locationNames
      postedAt
      title
      updatedAt
      userEmail
      tags {
        updatedAt
        name
        id
        createdAt
      }
      remotes {
        type
        updatedAt
        name
        id
        createdAt
      }
      countries {
        updatedAt
        type
        name
        isoCode
        createdAt
        id
        cities {
          updatedAt
          type
          name
          id
          createdAt
          country {
            updatedAt
            type
            name
            isoCode
            id
            createdAt
            cities {
              createdAt
              id
              name
              slug
              updatedAt
              type
            }
          }
        }
      }
    }
  }
}`;

export const longQuery = `{
  cities {
    createdAt
    id
    name
    type
    updatedAt
    country {
      updatedAt
      createdAt
      id
      type
      name
      jobs {
        isFeatured
        isPublished
        locationNames
        postedAt
        title
        updatedAt
        userEmail
        id
        description
        createdAt
        company {
          createdAt
          emailed
          id
          logoUrl
          name
          twitter
          updatedAt
          websiteUrl
        }
        commitment {
          id
          createdAt
          title
          updatedAt
        }
        applyUrl
        countries {
          jobs {
            isFeatured
            isPublished
            locationNames
            postedAt
            title
            updatedAt
            userEmail
            id
            description
            createdAt
            commitment {
              id
              createdAt
              title
              updatedAt
            }
            applyUrl
            countries {
              jobs {
                isFeatured
                isPublished
                locationNames
                postedAt
                title
                updatedAt
                userEmail
                id
                description
                createdAt
              }
            }
    			}
        }
      }
    }
  }
}`;
