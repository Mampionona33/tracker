import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import {
  difDate,
  formatSecondToDayHourMinSec,
} from '../assets/img/timeUtility';
import { AuthContext } from '../context/authContext';
import { GET_USER_TASK } from '../graphql/Query';

const Clock = () => {
  const userContext = useContext(AuthContext);
  const {
    data: allUserTasks,
    refetch: refetchAllUserTask,
    loading: loadingUserTask,
    error: errorOnLoadingAllUserTask,
  } = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: userContext.user.sub,
      },
    },
  });
  useEffect(() => {
    if (allUserTasks && allUserTasks.getUserTask) {
      const userTasks = Array.from(allUserTasks.getUserTask);
      const taskPlay = userTasks.filter((item) => item.taskState === 'isPlay');
      const sessionPlay = taskPlay.map((item) => item.session);
      const elapstedTimeArray = [];
      for (let i = 0; i < sessionPlay.length; i++) {
        const sessionArray = Array.from(sessionPlay[i]);
        for (let a = 0; a < sessionArray.length; a++) {
          if (sessionArray[a].sessionStop) {
            elapstedTimeArray.push(
              difDate(sessionArray[a].sessionStart, sessionArray[a].sessionStop)
            );
          }
        }
      }

      if (elapstedTimeArray.length > 0) {
        const elapStedTimeDate = elapstedTimeArray.reduce((a, b) => a + b);
        console.log(formatSecondToDayHourMinSec(elapStedTimeDate));
      }
    }
  }, [allUserTasks]);

  return (
    <div>
      <p>clock</p>
    </div>
  );
};

export default Clock;
