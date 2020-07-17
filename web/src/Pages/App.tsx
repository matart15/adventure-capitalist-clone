import React, { useState } from "react";
import "../App.less";
import { Switch, Route } from "react-router-dom";
import { Layout } from "../Layout";
import { Routes } from "../Routes";
import { Managers } from "../Components/Managers";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql } from "apollo-boost";
import { GameComponent } from "../Components/Game";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { getUserId, saveUserId } from "../Store/UserId";
import { ifError } from "assert";
const cache = new InMemoryCache();
// await before instantiating ApolloClient, else queries might run before the cache is persisted
persistCache({
  cache,
  storage: window.localStorage as any,
});
const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000",
});
const RegisterError = () => {
  return <div>Can't create new user</div>;
};
const RegisterLoading = () => {
  return <div>Registering New User ...</div>;
};
export default () => {
  const [isRegisterLoading, setRegisterLoading] = useState(false);
  const userId = getUserId();
  if ((!userId || isNaN(userId)) && !isRegisterLoading) {
    setRegisterLoading(true);
    client
      .mutate({
        mutation: gql`
          mutation RegisterUser {
            register {
              id
            }
          }
        `,
      })
      .then((result) => {
        setRegisterLoading(false);
        console.log(result);
        const newUserId = parseInt(result.data?.register?.id);
        if (!newUserId || isNaN(newUserId)) {
          return <RegisterError />;
        }
        saveUserId({ userId: newUserId });
      })
      .catch((e) => {
        setRegisterLoading(false);
        return <RegisterError />;
      });
  }
  if (isRegisterLoading) {
    return <RegisterLoading />;
  }
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Switch>
          <Route
            exact
            path={Routes.game.path}
            component={GameComponent}
          ></Route>
          <Route path={Routes.managers.path} component={Managers}></Route>
        </Switch>
      </Layout>
    </ApolloProvider>
  );
};
