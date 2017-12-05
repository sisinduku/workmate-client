import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink({uri: `https://api-workmate.mepawz.com/graphql`}),
  cache: new InMemoryCache()
});

export const queryJobSeekers = () => {
  const query = gql`
  {
    getJobSeekers {
      _id
      name
    }
  }`;
  return client.query({ query: query });
}

export const queryJobSeekerById = (id) => {
  id = '"' + id + '"';
  const query = gql`
  {
    getJobSeeker(_id: ${id}) {
      _id
      name
    }
  }`;
  return client.query({ query: query });
}

export const queryJobSeekersByPersonality = (criteria) => {
  criteria = JSON.stringify(criteria).replace(/"/g, '');
  const query = gql`
  {
    jobSeekersByPersonality(criteria: ${criteria}) {
      jobSeeker {
        _id
        name
        location
        educations
        skills
        executive_summary
        personality_insight
      }
      similarity
    }
  }`;
  return client.query({ query: query });
}

export const queryEmployers = () => {
  const query = gql`
  {
    getEmployers {
      Employer {
        _id
        name
      }
    }
  }`;
  return client.query({ query: query });
}

export const queryEmployerById = (id) => {
  id = '"' + id + '"';
  const query = gql`
  {
    getEmployer(_id: ${id}) {
      Employer {
        _id
        name
      }
    }
  }`;
  return client.query({ query: query });
}