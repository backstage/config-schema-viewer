import { AlertDisplay, createApp, FlatRoutes } from '@backstage/core';
import { ConfigSchemaPage } from '@backstage/plugin-config-schema';
import React from 'react';
import { Route } from 'react-router';
import { apis } from './apis/apis';
import * as plugins from './plugins';

const app = createApp({
  apis,
  plugins: Object.values(plugins),
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();

const App = () => (
  <AppProvider>
    <AlertDisplay />
    <AppRouter>
      <FlatRoutes>
        <Route path="/" element={<ConfigSchemaPage />} />
      </FlatRoutes>
    </AppRouter>
  </AppProvider>
);

export default App;
