import React, { useEffect, useState } from 'react'
import { RootState } from '../store'
import { BasicAsset, ChartDataType, ConsolidatedAsset, Query } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import InfoContainer from '../components/InfoContainer'
import { resetQuery } from '../store/reducers/query.slice'
import StandardContainer from '../components/StandardContainer'
import AssetContainer from '../components/AssetContainer'
import ApexChart from '../components/ApexChart'
import { BarChartData, createPorcentageChartData } from '../services/chart.service'
import CollapseTitle from '../components/CollapseTitle'

export default function FundosImobiliarios() {
  const dispatch = useDispatch()
  const [chartData, setChartData] = useState<BarChartData[]>([])

  const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)
  const realestate = useSelector<RootState, BasicAsset[]>(state => state.assets.filter(asset => asset.asset_type === 'realestate'))

  useEffect(() => {
    dispatch(resetQuery())
    setChartData(createPorcentageChartData(realestate, consolidado.realestate))
  }, [consolidado])

  return (
    <StandardContainer>
      <InfoContainer title='Fundos Imobiliarios' data={consolidado.realestate} />
      {
        realestate.length > 0 ?
          <>
            <CollapseTitle className='mb-8' title='Composição' initialShow={false} >
              <ApexChart series={[{ data: chartData }]} options={{
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
              }} type='bar' height='250px' />
            </CollapseTitle>
          </> : <></>
      }

      <AssetContainer assets={realestate} consolidado={consolidado.realestate} />
    </StandardContainer>
  )
}
