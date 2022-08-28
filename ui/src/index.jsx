import React, { StrictMode, Suspense} from 'react';
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
import Loading from './components/Loading';


root.render(
  <StrictMode>
    <Suspense fallback = {<Loading/>}>
        <ComponentProvider>
          <SimulationProvider>
            <HistoryProvider>
              <TaskProvider>
                <TaskTypeProvider>
                    <ApolloProvider client={client}>
                      <BrowserRouter>
                        <AuthProvider>
                          <GoogleOAuthProvider
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            onScriptLoadSuccess = {(message) => {console.log('GoogleOAuthProvider load success')}}
                            onScriptLoadError = {()=>console.log('error on load script GoogleOAuthProvider')}
                          >
                            <App />
                          </GoogleOAuthProvider>
                        </AuthProvider>
                      </BrowserRouter>
                    </ApolloProvider>
                </TaskTypeProvider>
              </TaskProvider>
            </HistoryProvider>
          </SimulationProvider>
        </ComponentProvider>
    </Suspense>
  </StrictMode>
);
