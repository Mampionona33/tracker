import React,{useState,useEffect} from 'react';
import TableWithPagination from './TableWithPagination';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_TYPE_TASK } from '../graphql/Query';

const ManageTabTaskTypeTable = () => {
const [data,setData] = useState([]);
const { data: allTaskType, error: errorOnLoadAllTaskType } =
    useQuery(GET_ALL_TYPE_TASK);

useEffect(() => {
    if (allTaskType && allTaskType.getAllTaskTypeList) {
      // taskTypeContext.setTaskType(allTaskType.getAllTaskTypeList);
    	setData(prev => allTaskType.getAllTaskTypeList)
    }
  }, [allTaskType]);

const columns = [
	{
		Header: 'TASK TYPE NAME',
		accessor : 'name',
	},
	{
		Header: 'GOAL',
		accessor : 'goal',
	}	
]

	return (
		<div>
			<TableWithPagination columns={columns} data={data} />
		</div>
	)
}

export default ManageTabTaskTypeTable;