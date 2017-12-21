import React from 'react'
import { map, addIndex } from 'rambda'
import { Modal } from 'antd'
import { totalAmount } from 'utils/calculate'

import './index.scss'

export const CustomModal = ({ modalData, modalVisible, closeDialogHandler }) => {
  if (!modalData) {
    return <Modal
      title={`hide`}
      visible={false}
    ></Modal>
  }

  const isFfc = (dialogType) => dialogType === 'ffc'

  const { planId, data, dialogType, ffc, ffc3d } = modalData
  const ffcList = ffc.split(',')
  const ffcTenThousand = ffcList[0]
  const ffcThousand = ffcList[1]
  const ffcHundred = ffcList[2]
  const ffcTen = ffcList[3]
  const ffcBit = ffcList[4]

  const ffc3dList = ffc3d.split(',')
  const ffc3dHundred = ffc3dList[0]
  const ffc3dTen = ffc3dList[1]
  const ffc3dBit = ffc3dList[2]

  const ffcFun = data.toString().split('').join(' + ')
  const ffcTotal = totalAmount(data.toString().split(''))

  const dataList = data.toString().split('')
  const lastUnit = (dataList, reverseIndex) => {
    return parseInt(dataList[dataList.length - reverseIndex], 10)
  }

  const mapWithIndex = addIndex(map)


  return (
    <Modal
      title={
        <div>
          <div className="modal-title">开奖算法</div>
          <div className="modal-subtitle">第{planId}期腾讯{isFfc(dialogType) ? '分分彩' : '3D彩'}</div>
        </div>
      }
      width={635}
      okText={'知道了'}
      visible={modalVisible}
      onOk={closeDialogHandler}
      onCancel={closeDialogHandler}
    >
      {
        isFfc(dialogType) ?
          <div className="modal-content">
            <p>当期腾讯在线人数：<span>{data}</span></p>
            <p>万位：<span>{ffcTenThousand}</span> (在线人数各位数和取尾数 <span>{ffcFun} = {ffcTotal}</span>, 取尾数<span>{ffcTenThousand}</span>)</p>
            <p>千位：<span>{ffcThousand}</span> (在线人数倒数第4位数)</p>
            <p>百位：<span>{ffcHundred}</span> (在线人数倒数第3位数)</p>
            <p>十位：<span>{ffcTen}</span> (在线人数倒数第2位数)</p>
            <p>个位：<span>{ffcBit}</span> (在线人数倒数第1位数)</p>
          </div> :
          <div className="modal-content">
            <p>当期腾讯在线人数：<span>{data}</span></p>
            <p>百位：<span>{ffc3dHundred}</span> (在线人数倒数第1位数 + 倒数第6位数=<span>{lastUnit(dataList, 1)} + {lastUnit(dataList, 6)} = {lastUnit(dataList, 1) + lastUnit(dataList, 6)}</span>， 取尾数<span>{ffc3dHundred}</span>)</p>
            <p>十位：<span>{ffc3dTen}</span> (在线人数倒数第2位数 + 倒数第5位数=<span>{lastUnit(dataList, 2)} + {lastUnit(dataList, 5)} = {lastUnit(dataList, 2) + lastUnit(dataList, 5)}</span>，取尾数<span>{ffc3dTen}</span>)</p>
            <p>个位：<span>{ffc3dBit}</span> (在线人数倒数第3位数 + 倒数第4位数=<span>{lastUnit(dataList, 3)} + {lastUnit(dataList, 4)} = {lastUnit(dataList, 3) + lastUnit(dataList, 4)}</span>，取尾数<span>{ffc3dBit}</span>)</p>
          </div>
      }


      <div className="openNumber-label">故本期开奖号码</div>
      <div className="openNumber-ball">
        {
          isFfc(dialogType) ? 
            mapWithIndex((ffc, index) => <div key={index} className="red-unit-small">{ffc}</div>)(ffcList)
            : 
            mapWithIndex((ffc3d, index) => <div key={index} className="red-unit-small">{ffc3d}</div>)(ffc3dList)
        }
      </div>
    </Modal>
  )
}