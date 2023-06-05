import React, { useEffect, useState } from 'react'
import { activeEventEmitter, listenRadarUpdates } from '../api/radar.api';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addRadarItem, deleteRadarItem, updateRadar } from '../store/reducers/radar.slice';
import { RootState } from '../store';
import { RadarType, SingleStockRequestType, User } from '../types';
import Select from './Select';
import Datalist from './Datalist';
import { CiTrash } from 'react-icons/ci';
import toast from 'react-simple-toasts';
import RadarModal from './RadarModal';
import RadarItem from './RadarItem';


function Radar() {
    const dispatch = useDispatch()
    const radar = useSelector<RootState, RadarType[]>(state => state.radar)
    const user = useSelector<RootState, User>(state => state.user)
    const [showRadarModal, setShowRadarModal] = useState(false)

    const toggleRadarModal = () => {
        setShowRadarModal(!showRadarModal)
    }
    useEffect(() => {
        if (user.isAuthenticated) {
          
            listenRadarUpdates((radarItems) => {
                dispatch(updateRadar(radarItems))
            })

            activeEventEmitter()
        }
    }, [])

    return (
        <>

            <div className='bg-cinza-400 rounded-3xl py-6 w-full h-auto drop-shadow-lg px-2 md:px-6'>
                <div className='flex w-full justify-center items-center'>
                    <h3 className='text-center text-2xl text-verde-300 pb-4 ml-auto'>RADAR</h3>
                    <AiOutlinePlusCircle size={20} className='mb-3 ml-auto text-verde-300 cursor-pointer hover:text-verde-200' onClick={toggleRadarModal} />
                </div>
                <div className='flex justify-between flex-col lg:flex-row gap-4 items-center overflow-x-auto pb-4 no-scrollbar hover:scrollbar lg:mb-2 lg:hover:mb-0'>
                    {
                        radar.map((item) => (
                            <RadarItem asset={item} key={item.asset_code} />
                        ))
                    }

                </div>
            </div>
            {showRadarModal &&
                <RadarModal toggle={toggleRadarModal} />
            }
        </>
    )
}

export default Radar
