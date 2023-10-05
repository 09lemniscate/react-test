import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login';
import { CallsListPage } from './pages/CallsList';
import { CallDetailsPage } from './pages/CallDetails';
import { Tractor } from '@aircall/tractor';

import './App.css';
import { ProtectedLayout } from './components/routing/ProtectedLayout';
import { darkTheme } from './style/theme/darkTheme';
import { RouterProvider } from 'react-router-dom';
import { GlobalAppStyle } from './style/global';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split, fromPromise, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AuthProvider } from './hooks/useAuth';
import { REFRESH_TOKEN } from './gql/mutations';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';



const httpLink = createHttpLink({
  uri: 'https://frontend-test-api.aircall.dev/graphql'
});


const wsLink = new GraphQLWsLink(createClient({
  url:'wss://frontend-test-api.aircall.dev/websocket',
  connectionParams: async () => {
    const token = getToken();
    return {
      authorization: token ? `Bearer ${token}` : ''
    };
  }
})
);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);
const getNewAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token') || '';
  if (!refreshToken) {
    console.log('refresh token missing')
  }
  localStorage.setItem('access_token', refreshToken);
  const {
    data: { refreshTokenV2 }
  } = await client.mutate({ mutation: REFRESH_TOKEN });
  return refreshTokenV2.access_token;
};

const getToken = () => {
  const accessToken = localStorage.getItem('access_token');
  return accessToken ? JSON.parse(accessToken) : undefined;
};

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const accessToken = localStorage.getItem('access_token');
  const parsedToken = accessToken ? JSON.parse(accessToken) : undefined;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${parsedToken}` : ''
    }
  };
});
const errorLink = onError(({ forward, graphQLErrors, operation }) => {
  if (graphQLErrors) {
    const hasUnauthorizedError = graphQLErrors.some(error => {
      const { status } = error.extensions.exception as { status: number };
      return status === 401;
    });
    if (hasUnauthorizedError) {
      return fromPromise(
        getNewAccessToken().catch(() => {
          // If the token refresh fails,
          // clear LocalStorage and redirect to login page
          localStorage.clear();
          window.location.href = '/login';
        })
      )
        .filter(value => Boolean(value))
        .flatMap(accessToken => {
          localStorage.setItem('access_token', JSON.stringify(accessToken));
          operation.setContext({
            headers: {
              ...operation.getContext().headers,
              authorization: `Bearer ${accessToken}`
            }
          });
          return forward(operation);
        });
    }
  }
});
const links = [authLink, errorLink, splitLink];

const client = new ApolloClient({
  link: ApolloLink.from(links),
  cache: new InMemoryCache()
});

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/calls" element={<ProtectedLayout />}>
        <Route path="/calls" element={<CallsListPage />} />
        <Route path="/calls/:callId" element={<CallDetailsPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <Tractor injectStyle theme={darkTheme}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
        <GlobalAppStyle />
      </ApolloProvider>
    </Tractor>
  );
}

export default App;
