import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, lazy } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import HistoryTable from './components/HistoryTable';
import ManageTabContainer from './components/ManageTabContainer';
import MyTaskTable from './components/MyTaskTable';
import ManageTabTaskType from './components/ManageTabTaskType';
import ManageTabUser from './components/ManageTabUser';
import TaskOffList from './components/TaskOffList';
import { AuthContext } from './context/authContext';
import { TaskContext } from './context/taskContext';
import { TaskTypeContext } from './context/taskTypeContext';
import { GET_ALL_TYPE_TASK } from './graphql/Query';
import { getUserTask } from './graphql/tasks';
import { createUser, getUser } from './graphql/user';
import AdminRoute from './pages/AdminRoute';
import History from './pages/History';
import Login from './pages/Login';
import Manage from './pages/Manage';
import MyTask from './pages/MyTask';
import ProtectedRoute from './pages/ProtectedRoute';
import SubmitedTask from './pages/SubmitedTask';
import Dashboard from './pages/Dashboard';

export default function App() {
  const context = useContext(AuthContext);
  const currentUser = context.user;
  const taskContext = useContext(TaskContext);
  const taskTypeContext = useContext(TaskTypeContext);
  const { data: allTaskType, error: errorOnLoadAllTaskType } =
    useQuery(GET_ALL_TYPE_TASK);

  useEffect(() => {
    if (allTaskType && allTaskType.getAllTaskTypeList) {
      taskTypeContext.setTaskType(allTaskType.getAllTaskTypeList);
    }
  }, [allTaskType]);

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
              taskContext.setUserTaskPlay(taskPlay.length > 0 ? taskPlay : []);
            }
          }
        }
      }
    })();
    // clean up the async function on components unmount by returning mounted=false
    return () => (mounted = false);
  }, [currentUser]);

  if (errorOnLoadAllTaskType) {
    return (
      <div
        className='error'
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '25vh',
        }}
      >
        <h1>{errorOnLoadAllTaskType.message}</h1>;
      </div>
    );
  }

  console.log(currentUser);

  return (
    <Routes>
      <Route
        path='/login'
        element={
          !context.user ? <Login /> : <Navigate to={'/dashboard'} replace />
        }
      />
      <Route
        path='/'
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
        <Route path='/mytasks' element={<MyTask />}>
          <Route path='row_show=:row_show' element={<MyTaskTable />} />
        </Route>
        {/* 
          the default component to render when path is /history is the <History/> component
          when /history get params date; then render the <Outlet/> inside the history Route
          and inside <History/> component
        */}
        <Route path='/history' element={<History />}>
          <Route
            path='date=:date&row_show=:row_show'
            element={<HistoryTable />}
          />
        </Route>
        <Route path='/submited' element={<SubmitedTask />} />
        <Route element={<AdminRoute />}>
          <Route path='/manage' element={<Manage />}>
            <Route path=':manage_tab' element={<ManageTabContainer />} />
            {/*<Route path='task_type' element={<ManageTabTaskType/>} />
            <Route path='users' element={<ManageTabUser/>} />*/}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
