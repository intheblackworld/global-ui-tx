import React from 'react'

import './index.scss'

const RuleDescription = (props) => {
  const { type } = props

  return (
    <div>
      <div className='desc-title'>腾讯{type === 'ffc' ? '分分彩' : '3D彩'}玩法介绍</div>
      <div className='desc-content'>
        {
          type === 'ffc' && <ul>
            <li>1) &nbsp;&nbsp; 开奖时间：00:00 - 24:00</li>
            <li>2) &nbsp;&nbsp; 开奖频率：每1分钟开奖一次，一天开奖1440期</li>
            <li>3) &nbsp;&nbsp; 号码来源：腾讯官网：<a href='http://im.qq.com/' target='_blank'>http://im.qq.com/</a></li>
            <li>4) &nbsp;&nbsp; 玩法： 以每分钟腾讯QQ的在线用户人数数字生成一个五位数字作为腾讯分分彩当期的开奖号码。</li>
            <li>
              <div className="list-icon"></div>
              <p>万位数：依照官方公布当时的在线人数数字之总和，再取尾数 （例如：线上人数227,415,242人，则为2+2+7+4+1+5+2+4+2=29，</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;取尾数9，因此万位数为9</p>
            </li>
            <li>
              <div className="list-icon"></div>
              <p>后四码：依照官方公布当时的在线人数，取末四位为千百十个这四个号码（例如：线上人数227,415,242人，则末4位为5242）</p>
            </li>
            <li>
              <div className="list-icon"></div>
              故开奖号码为：<span>9、5、2、4、2</span>
            </li>
          </ul>
        }
        {
          type === 'ffc3d' && <ul>
            <li>1)  &nbsp;&nbsp; 开奖时间：00:00 — 24:00</li>
            <li>2)  &nbsp;&nbsp; 开奖频率：每1分钟开奖一次，一天开奖1440期 </li>
            <li>3)  &nbsp;&nbsp; 号码来源：腾讯官网：<a href='http://im.qq.com/' target='_blank'>http://im.qq.com/</a></li>
            <li>4)  &nbsp;&nbsp; 玩法： 以每分钟腾讯QQ的在线用户人数数字生成一个三位数字作为当期的开奖号码。</li>
            <li>
              <div className="list-icon"></div>
              <p>百位数：腾讯官网当前QQ在线用户人数数字最后1位与倒数第6位的和值，取尾数。如： 腾讯QQ在线用户人数为227,763,615人，</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最后1位数为5，倒数第6位数为7, 两位数相为5+7=12，取尾数2</p>
            </li>

            <li>
              <div className="list-icon"></div>
              <p>十位数：腾讯官网当前QQ在线用户人数数字倒数第2位与倒数第5位的和值，取尾数。如： 腾讯QQ在线用户人数为227,763,615人，</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;倒数第 2位数为1，倒数第5位数为6, 两位数相为1+6=7，取尾数7</p>
            </li>
            <li>
              <div className="list-icon"></div>
              <p>个位数：腾讯官网当前QQ在线用户人数数字倒数第3位与倒数第4位的和值，取尾数。如： 腾讯QQ在线用户人数为227,763,615人，</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;倒数第 3位数为6，倒数第4位数为3 两位数相为6+3=9，取尾数9</p>
            </li>
            <li>
              <div className="list-icon"></div>
              故开奖号码为：
            <span>2、7、9</span>
            </li>
          </ul>
        }


      </div>
    </div>
  )
}

export default RuleDescription