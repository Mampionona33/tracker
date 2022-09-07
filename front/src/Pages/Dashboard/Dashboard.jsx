import React, { useContext, useEffect, useState } from 'react';
import ProcessingTask from '../../Components/ProcessingTask/ProcessingTask';
import TitledCard from '../../Components/TitledCard/TitledCard';
import { AuthConext } from '../../context/authContext';
import { DashboardContainer, Spliter } from './Dashboard.style';
import { getUserTasks } from './../../Graphql/graphqlTasks';

export default function Dashboard(props) {
  const [processingTask, setProcessingTask] = useState([]);
  const { sub } = useContext(AuthConext);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (sub) {
        const allUserTasks = await getUserTasks(sub);
        if (isMounted) {
          if (allUserTasks && allUserTasks.length > 0) {
            console.table(allUserTasks);
          }
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [sub]);

  return (
    <DashboardContainer>
      <TitledCard
        icon='engineering'
        iconBackGround='#3949AB'
        title='processing task'
      >
        <Spliter />
        <ProcessingTask />
      </TitledCard>

      <TitledCard
        icon='science'
        iconBackGround='#39A275'
        title='testing productivity'
      >
        TESTING
      </TitledCard>
    </DashboardContainer>
  );
}
