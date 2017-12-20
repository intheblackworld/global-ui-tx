import React from 'react'
import { Modal } from 'antd'

export const CustomModal = ({ modalData, modalVisible, closeDialogHandler }) => {
  if (!modalData) {
    return <Modal
      title={`hide`}
      visible={false}
    ></Modal>
  }

  const isFfc = (dialogType) => dialogType === 'ffc'

  const { planId, data, dialogType, ffc, ffc3d } = modalData
  return (
    <Modal
      title={`开奖算法 第${planId}腾讯${isFfc(dialogType) ? '分分彩' : '3D彩'}`}
      visible={modalVisible}
      onOk={closeDialogHandler}
      onCancel={closeDialogHandler}
    >
      {
        isFfc(dialogType) ?
          <div>
            <p>当期腾讯在线人数：<span>{data}</span></p>
            <p>万位：<span>9</span> (在线人数各位数和取尾数 <span>2 + 2 + 7 + 4 + 1 + 5 + 2 + 4 + 2 = 29</span>, 取尾数<span>9</span>)</p>
            <p>千位：<span>5</span> (在线人数倒数第4位数)</p>
            <p>百位：<span>2</span> (在线人数倒数第3位数)</p>
            <p>十位：<span>4</span> (在线人数倒数第2位数)</p>
            <p>个位：<span>2</span> (在线人数倒数第1位数)</p>
          </div> :
          <div>
            <p>百位：<span>2</span> (在线人数倒数第1位数 + 倒数第6位数=<span>5+7=12</span>， 取尾数<span>2</span>)</p>
            <p>十位：<span>4</span> (在线人数倒数第2位数 + 倒数第5位数=<span>1+6=7</span>，取尾数<span>7</span>)</p>
            <p>个位：<span>2</span> (在线人数倒数第3位数 + 倒数第4位数=<span>6+3=9</span>，取尾数<span>9</span>)</p>
          </div>
      }


      <p>故本期开奖号码</p>
      <div className="openNumber-ball">
        {
          isFfc(dialogType) ? <p>{ffc}</p> : <p>{ffc3d}</p>
        }
      </div>
    </Modal>
  )
}