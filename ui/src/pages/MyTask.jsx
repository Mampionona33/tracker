import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const MyTask = () => {
  const { row_show } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    row_show
      ? navigate(`row_show=${row_show}`, { replace: true })
      : navigate('row_show=3', { replace: true });
  }, [row_show]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Outlet />
    </div>
  );
};

export default MyTask;
