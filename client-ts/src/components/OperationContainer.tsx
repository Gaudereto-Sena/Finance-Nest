import React, { useEffect, useRef } from 'react'
import OperationBar from './OperationBar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { OperationsResponse, Query } from '../types'
import { resetQuery, updateQuery } from '../store/reducers/query.slice'
import { getOperations } from '../store/reducers/operations.slice'
import PaginationArrows from './PaginationArrows'
import OperationItem from './OperationItem'

function OperationContainer() {
    const dispatch = useDispatch()
    const operations = useSelector<RootState, OperationsResponse>((state) => state.operations)
    const query = useSelector<RootState, Query>((state) => state.query)

    const changeQuery = (newQuery: Partial<Query>) => {
        dispatch(updateQuery(newQuery))
    }

    return (
        <div>
            <div className=''>
                <div className='flex justify-between flex-col overflow-y-auto scrollbar'>
                    {
                        operations.operations.length > 0 &&
                        <OperationBar />
                    }
                    {
                        operations.operations.length > 0 &&
                        operations.operations.map((operation) => {
                            return (
                                <OperationItem data={operation} key={operation.created_at.toLocaleString()} />
                            )
                        })
                    }
                    {
                        operations.operations.length === 0 &&
                        <div className='text-center uppercase text-verde-600 font-bold'>
                            Lista de operações está vazia
                        </div>
                    }
                </div>
                {
                    operations.operations.length > 0 &&
                    <PaginationArrows changeQueryFunction={changeQuery} count={operations.count} query={query} />
                }
            </div>
        </div >
    )
}

export default OperationContainer