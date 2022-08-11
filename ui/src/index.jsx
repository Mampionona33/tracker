import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { AuthProvider } from './context/authContext';
import './style/index.scss';
import { ComponentProvider } from './context/componentContext';
import { TaskProvider } from './context/taskContext';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
import { HistoryProvider } from './context/historyContext';
import { TaskTypeProvider } from './context/taskTypeContext';
import { SimulationProvider } from './context/simulationContext';

root.render(
  <StrictMode>
    <AuthProvider>
      <ComponentProvider>
        <SimulationProvider>
          <HistoryProvider>
            <TaskProvider>
              <TaskTypeProvider>
                <GoogleOAuthProvider
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                >
                  <ApolloProvider client={client}>
                    <BrowserRouter>
                      <App />
                    </BrowserRouter>
                  </ApolloProvider>
                </GoogleOAuthProvider>
              </TaskTypeProvider>
            </TaskProvider>
          </HistoryProvider>
        </SimulationProvider>
      </ComponentProvider>
    </AuthProvider>
  </StrictMode>
);
