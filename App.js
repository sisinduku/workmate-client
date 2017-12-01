import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './screens/Home';
import SearchJobSeekers from './screens/SearchJobSeekers';
import JobSeekerList from './screens/JobSeekerList';
import JobSeekerProfile from './screens/JobSeekerProfile';
import CreateJobSeekerProfile from './screens/CreateJobSeekerProfile';
import JobSeekerOwnProfile from './screens/JobSeekerOwnProfile';

const rootNavigator = StackNavigator({
  /*
    HOME SCREEN
  */
  Home: {
    screen: Home,
    navigationOptions: { headerTitle: 'Workmate' }
  },

  /*
    Navigate from 'Home'
    EMPLOYER ROLE ONLY - Search job seeker by personality  
  */
  SearchJobSeekers: {
    screen: SearchJobSeekers,
    navigationOptions: { headerTitle: 'Search Job Seekers' }
  },

  /*
    Navigate from 'SearchJobSeekers'
    EMPLOYER ROLE ONLY - See list of job seekers matched with searched queries
  */
  JobSeekerList: {
    screen: JobSeekerList,
    navigationOptions: { headerTitle: 'Job Seeker List' }
  },

  /*
    Navigate from 'JobSeekerList'
    EMPLOYER ROLE ONLY - See job seeker profile
  */
  JobSeekerProfile: {
    screen: JobSeekerProfile,
    navigationOptions: { headerTitle: 'Job Seeker Profile' }
  },

  /*
    Navigate from 'Home' if job_seeker haven't create any profile
    JOB SEEKER ROLE ONLY - Create profile (add summary, etc)
  */
  CreateJobSeekerProfile: {
    screen: CreateJobSeekerProfile,
    navigationOptions: { headerTitle: 'Create Profile' }
  },

  /*
    Navigate from 'Home' if job_seeker has create a profile
    else Navigate from 'CreateJobSeekerProfile'
    JOB SEEKER ROLE ONLY - See his/her own profile
  */
  JobSeekerOwnProfile: {
    screen: JobSeekerOwnProfile,
    navigationOptions: { headerTitle: 'Your Profile' }
  }
});

export default rootNavigator;
