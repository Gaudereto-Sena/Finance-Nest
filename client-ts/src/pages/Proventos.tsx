import React, { useEffect, useState } from 'react'
import StandardContainer from '../components/StandardContainer'
import InfoContainerItem from '../components/InfoContainerItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { BasicAsset, ChartDataType, ConsolidatedAsset, EarningResponseType, Query, WalletAssets } from '../types'
import Grafico from '../components/Grafico'
import EarningsContainer from '../components/EarningsContainer'
import { resetQuery } from '../store/reducers/query.slice'
import { getEarnings } from '../store/reducers/earnings.slice'
import { createEarningsTable } from '../services'
import QueryOptions from '../components/QueryOptions'
import EarningsInfoContainer from '../components/EarningsInfoContainer'

function Proventos() {
    const dispatch = useDispatch()
    const [chartData, setChartData] = useState<ChartDataType[]>([])
    const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)
    const assets = useSelector<RootState, BasicAsset[]>(state => state.assets)
    const earnings = useSelector<RootState, EarningResponseType>(state => state.earnings)
    const query = useSelector<RootState, Query>(state => state.query)

    useEffect(() => {
        dispatch(resetQuery)
    }, [])

    useEffect(() => {
        setChartData(createEarningsTable(assets))
    }, [earnings])

    useEffect(() => {
        dispatch(getEarnings(query))
    }, [query])

    return (
        <StandardContainer>
            <EarningsInfoContainer />
            <QueryOptions title='' />
            <Grafico
                title='Proventos Recebidos'
                className='px-4 mb-8'
                height='400px'
                options={{ backgroundColor: "#F9F9F9", legend: { position: 'none' }, height: 400 }}
                dados={chartData}
                chartType='BarChart' />

            <EarningsContainer />


        </StandardContainer>
    )
}

export default Proventos