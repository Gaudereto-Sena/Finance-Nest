import React from 'react'
import { SingleStockRequestType } from '../types'

type DatalistType = {
    id: string,
    funcaoOnChange: (arg: any) => void,
    value: any,
    dataAssetsOptions?: {
        stockshare: SingleStockRequestType[],
        realestate: SingleStockRequestType[]
    },
    dataOptions?: string[],
    watch?: string
    otherProps?: any
    className?: string,
    disabled?: boolean

}

function Datalist({ watch, value, id, className, dataAssetsOptions, dataOptions, funcaoOnChange, disabled = false }: DatalistType) {
    return (
        <div className='flex flex-col w-full'>
            <input
                className={`bg-cinza-600 shadow-sm w-full rounded-[10px] text-base p-3 box-border my-3 text-verde-600 placeholder-verde-600 placeholder-opacity-100 ${className}`}
                list={id}
                onChange={event => funcaoOnChange(event.target.value)}
                value={value}
                disabled={disabled}
            />
            <datalist id={id}>
                {
                    watch === 'stockshare' &&
                    dataAssetsOptions?.stockshare.map((ativo) => <option value={ativo.stock} key={ativo.stock}>
                        {ativo.stock.toUpperCase()}
                    </option>)
                }
                {
                    watch === 'realestate' &&
                    dataAssetsOptions?.realestate.map((ativo) => <option value={ativo.stock} key={ativo.stock}>
                        {ativo.stock.toUpperCase()}
                    </option>)
                }
                {
                    !watch &&
                    dataOptions?.map(string => <option value={string} key={string}>{string}</option>)
                }
            </datalist>
        </div>
    )
}

export default Datalist
