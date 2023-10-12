
### Expectations

As said above, the application is far from being production ready. We'll ask you to fix some known issues, improve existing features and add new ones.

You won't have time to fix everything, and we don't expect you to. Also, we adjust our expectations depending on your seniority. Here's what expected for each level of seniority:

- **junior software engineer**
  - [X] improve the pagination in the calls list view. The app displays a dropdown to let users change the number of calls per page. But it actually has no impact on the UI. Please fix that.
  - add a filtering feature in the calls list view. You can for instance filter on the call type, or the direction.
  - group calls per day. For instance, if 3 calls were made the same day, group them into the same section.
- **software engineer**
  - add a filtering feature in the calls list view. You can for instance filter on the call type, or the direction.
  - group calls per day. For instance, if 3 calls were made the same day, group them into the same section.
  - [X] fix the logout feature. For now, it does redirect the users to the login page but they are automatically redirected back to the calls list.
  - [X] fix the token expiration UX. Access tokens are invalid after 10 minutes, making all new requests fail. Either improve the user experience by redirecting users to the login page with an information toast or use the refresh token (see API docs).
  - [X] add unit tests for the `date` helper functions.
- **senior software engineer**
  - [X] fix the logout feature. For now, it does redirect the users to the login page but they are automatically redirected back to the calls list.
  - [X] fix the token expiration UX. Access tokens are invalid after 10 minutes, making all new requests fail. Either improve the user experience by redirecting users to the login page with an information toast or use the refresh token (see API docs).
  - [X] add an end to test for the feature of your choice. For instance, test that users can log into the app, access to the details of call and log out.
  - [X] implement the archive call feature and add real-time support. Meaning that if you open the app in 2 tabs, archive a call from the first tab, the second tab must reflect this change. Create a PR for this feature as if you were submitting it to our team, for it to be merged and released in production. As we try to work asynchonously, writing skills are important to us.
- **staff engineer and above**
  - same expectations as for senior software engineer
  - write a plan describing what would be required for this app to be released into production, keeping the same features set, and how you would implement it. Potential topics to be addressed here are: testing, CI/CD, documentation, performances, scaling, developer experience... We don't expect you to address all of them, focus on the ones that matters the most for you.

### Stack

The application relies on a quite common stack. It's a React/Typescript application, created with `create-react-app`, and using a GraphQL API. It uses our own lovely UI library, called Tractor. It's a public library, you can have access to its [Storybook](http://tractor.aircall.io/) and [NPM](https://www.npmjs.com/package/@aircall/tractor) page.

If you joined us, you'd work on a very similar stack.

## APIs

The application relies on a GraphQL API. You can find its documentation [here](documentation/GRAPHQL_API.md) and more information about the models [there](documentation/MODELS.md).

We've previously built a REST API for this test as well. While we suggest you to work with the GraphQL API, you could switch to the REST API if you'd like. You'd find its documentation [here](documentation/REST_API.md).

## Submission

Please fork this repository and submit your technical test through this [form](https://forms.gle/1TG1snJoGgvPKox5A).

We'll try to review it in the next 48 hours and get back to you to talk about your code!

Contact us at jobs@aircall.io if you need more details.
