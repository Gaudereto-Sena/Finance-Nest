import React, { useEffect, useState } from 'react'
import InfoContainer from '../components/InfoContainer'
import { RootState } from '../store'
import { BasicAsset, ChartDataType, ConsolidatedAsset } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { resetQuery } from '../store/reducers/query.slice'
import Grafico from '../components/Grafico'
import StandardContainer from '../components/StandardContainer'
import AssetContainer from '../components/AssetContainer'
import ApexChart from '../components/ApexChart'
import { BarChartData, createPorcentageChartData } from '../services/chart.service'
import CollapseTitle from '../components/CollapseTitle'

export default function Acoes() {
    const dispatch = useDispatch()
    const [chartData, setChartData] = useState<BarChartData[]>([])
    const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)
    const assets = useSelector<RootState, BasicAsset[]>(state => state.assets.filter((asset) => asset.asset_type === 'stockshare' && asset.total_quantity !== 0))

    useEffect(() => {
        dispatch(resetQuery())
    }, [])

    useEffect(() => {
        setChartData(createPorcentageChartData(assets, consolidado.stockshare))
    }, [consolidado])

    return (
        <StandardContainer>
            <InfoContainer title='Ações' data={consolidado.stockshare} />
            <CollapseTitle className='mb-8' title='Composição' initialShow={false} >
                <ApexChart series={[{ data: chartData }]}  options={{
                    chart: {
                        type: 'bar'
                    },
                    xaxis: {
                        type: 'category'
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    }
                }} type='bar' height='300px' />
            </CollapseTitle>


            <AssetContainer assets={assets} consolidado={consolidado.stockshare} />
        </StandardContainer >
    )
}
