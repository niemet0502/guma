import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { AuthProvider } from "./domains/auth/providers/auth.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.tsx";

const httpLink = createHttpLink({
  uri: "/api",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const session = localStorage.getItem("session");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: session ? `Bearer ${JSON.parse(session).token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
