import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import { TaskContext } from './context/taskContext';
import { getUserTask } from './graphql/tasks';
import { createUser, getUser } from './graphql/user';
import AdminRoute from './pages/AdminRoute';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Login from './pages/Login';
import Manage from './pages/Manage';
import ProtectedRoute from './pages/ProtectedRoute';

export default function App() {
  const context = useContext(AuthContext);
  const currentUser = context.user;
  const taskContext = useContext(TaskContext);

  useEffect(() => {
    /*
      create  the variable mounted to cleaning up
      the async function. It prevent the double rendering
      of the component. 
      - on component mount set mounted value to true
      - on component unmount set the mounted value to false with return () => (mounted= false).
      when using StrictMode, the component is mount then unmount then mount. So we need to do
      this clean up when calling async in useEffect.
    */
    let mounted = true;
    // on app mount, check if user exist in the data base
    (async () => {
      if (currentUser) {
        const userExist = await getUser(currentUser.sub);
        if (mounted) {
          // if user is not yet in the data base, create it
          if (!userExist) {
            const crtUser = await createUser(currentUser);
          }
          // if the user exist in the data base. Get his tasklist
          // by his sub from the google token
          if (userExist) {
            const userTaskData = await getUserTask(currentUser.sub);
            await taskContext.setUserTasks(userTaskData);

            // if the user have tasks
            if (userTaskData) {
              // get the user task play then assign it to the taskPlay on the context
              const taskPlay = userTaskData.filter(
                (tasks) => tasks.taskState === 'isPlay'
              );
              // if there is a played task set taskPlay on the context equal
              // to the fetched taskPlay else set taskPlay on context equel null
              taskContext.setUserTaskPlay(
                taskPlay.length > 0 ? taskPlay : null
              );
            }
          }
        }
      }
    })();
    // clean up the async function on components unmount by returning mounted=false
    return () => (mounted = false);
  }, [currentUser]);

  // console.log(taskContext.userTaskPlay);

  return (
    <Routes>
      <Route
        path='/login'
        element={
          !context.user ? <Login /> : <Navigate to={'/dashboard'} replace />
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path='/'
          element={
            !context.user ? (
              <Navigate to={'/login'} />
            ) : (
              <Navigate to={'/dashboard'} />
            )
          }
        />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/history' element={<History />} />
        <Route element={<AdminRoute />}>
          <Route path='/manage' element={<Manage />} />
        </Route>
      </Route>
    </Routes>
  );
}

/* 
ui .env files
ENABLE_HMR = true
UI_SERVER_PORT  = 8000
UI_API_ENDPOINT=http://localhost:3000/graphql
API_PROXY_TARGET=http://localhost:3000

GOOGLE_LOGGIN_TARGET = https://accounts.google.com

REACT_APP_AUTH0_DOMAIN = dev-4k9kw00s.eu.auth0.com
REACT_APP_AUTH0_CLIENT_ID = iNHhECtfsmhJf3d6aq6LHW2hdWIpNXmk

REACT_APP_GOOGLE_CLIENT_ID = 498868729809-sqv8at247oi30ldgt0se55j5397u71br.apps.googleusercontent.com

PRIVATE_KEY = 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

*/
