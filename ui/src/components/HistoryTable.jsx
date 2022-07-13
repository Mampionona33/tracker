import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_TASK_BY_DATE } from '../graphql/Query';
import Table from './Table';

export default function HistoryTable({ selectedDate }) {
  const userContext = useContext(AuthContext);
  const selectedDateIso = selectedDate.toISOString().slice(0, 10);
  const { data: taskBydateData, error: errorFetchTaskByDate } = useQuery(
    GET_TASK_BY_DATE,
    {
      variables: {
        query: {
          date: selectedDateIso,
          sub: userContext.user.sub,
        },
      },
    }
  );

  useEffect(() => {
    if (taskBydateData) {
      //   console.log(taskBydateData.getTaskByDate);
      const dataSelect = taskBydateData.getTaskByDate;
      //   console.log(dataSelect);

      const taskInSelectedDate = dataSelect.map((item) => {
        let start = ``;
        let stop = ``;

        const boothNumber = item.boothNumber;
        for (let i = 0; i < item.session.length; i++) {
          const startTmp = item.session[i].sessionStart;
          if (startTmp.slice(0, 10) === selectedDateIso) {
            const strDate = new Date(startTmp);
            start = `${strDate.getHours()}:${strDate.getMinutes()}:${strDate.getSeconds()}`;
            const stopTmp = item.session[i].sessionStop;
            if (stopTmp) {
              const stpDate = new Date(stopTmp);
              const refDate = new Date(selectedDateIso);
              // console.log(stopTmp);
              if (
                stpDate.getFullYear() === refDate.getFullYear() &&
                stpDate.getMonth() === refDate.getMonth() &&
                stpDate.getDay() === refDate.getDay()
              ) {
                stop = `${stpDate.getHours()}:${stpDate.getMinutes()}:${stpDate.getSeconds()}`;
              }
              if (
                stpDate.getFullYear() === refDate.getFullYear() &&
                stpDate.getMonth() === refDate.getMonth() &&
                stpDate.getDay() !== refDate.getDay()
              ) {
                stop = `${stpDate.getHours()}:${stpDate.getMinutes()}:${stpDate.getSeconds()} (${stpDate.getFullYear()}-${stpDate.getMonth()}-${stpDate.getDay()})`;
              }
            }
            if (!stopTmp) {
              stop = `current`;
            }
          }
        }

        console.log(`${boothNumber} -  ${start}  - ${stop}`);
        // return start;
      });
      //   if (taskInSelectedDate) {
      //     console.log(selectedDateIso);
      //     const startSessionSelectedDate = taskInSelectedDate.filter(
      //       (item) => item.slice(0, 10) === selectedDateIso
      //     );
      //     console.log(startSessionSelectedDate);
      //   }
    }
  }, [taskBydateData]);

  const data = [
    {
      name: 'Sara Turner',
      email: 'sara.turner@example.com',
      phone: '(603)-641-0238',
    },
    {
      name: 'Christian Kelley',
      email: 'christian.kelley@example.com',
      phone: '(153)-324-6597',
    },
    {
      name: 'Annie Dean',
      email: 'annie.dean@example.com',
      phone: '(373)-005-2708',
    },
    {
      name: 'Cameron Hunt',
      email: 'cameron.hunt@example.com',
      phone: '(912)-351-7665',
    },
    {
      name: 'Brandon Cook',
      email: 'brandon.cook@example.com',
      phone: '(554)-103-5975',
    },
    {
      name: 'Ashley Jones',
      email: 'ashley.jones@example.com',
      phone: '(604)-896-2642',
    },
    {
      name: 'Allan Fields',
      email: 'allan.fields@example.com',
      phone: '(197)-032-6069',
    },
    {
      name: 'Justin Barnes',
      email: 'justin.barnes@example.com',
      phone: '(002)-902-1774',
    },
    {
      name: 'Willie Jordan',
      email: 'willie.jordan@example.com',
      phone: '(535)-969-6902',
    },
    {
      name: 'Rhonda Cooper',
      email: 'rhonda.cooper@example.com',
      phone: '(746)-018-4462',
    },
  ];

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
  ];

  return (
    <div className='historyTable'>
      <Table columns={columns} data={data} />
    </div>
  );
}
