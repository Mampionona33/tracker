import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_USER_TASK } from '../graphql/Query';
import DialogTitle from './DialogTitle';

const DialogConfirmSubmit = () => {
  const userContext = useContext(AuthContext);
  const {} = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: userContext.user.sub,
      },
    },
  });

  return (
    <div className='dialogConfirmSubmit'>
      <DialogTitle>CONFIRM TASK SUBMIT</DialogTitle>
      <h4>DO YOU REALY WHANT TO SUBMIT THIS TASK</h4>
    </div>
  );
};

export default DialogConfirmSubmit;
