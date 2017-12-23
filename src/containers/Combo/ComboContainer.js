import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { map, addIndex } from 'ramda'

import ComboSection from './ComboSection'

const ComboContainer = (props) => {
  const {
    tenThousands,
    thousands,
    hundreds,
    tens,
    units,
    sumValues,
    LLH,
  } = props.comboList

  const typeNameList = ['大小', '单双']

  const mapWithIndex = addIndex(map)

  const renderComboSection = (location) => {
    return mapWithIndex((name, index) => (
      <ComboSection
        key={index}
        sectionType="default"
        currentLimit={currentLimit}
        handleLimitChange={props.handleLimitChange}
        typeName={name}
        bigCount={location.sizeDisplay.bgCount}
        smallCount={location.sizeDisplay.slCount}
        oddCount={location.oddEvenDisplay.odCount}
        evenCount={location.oddEvenDisplay.enCount}
        comboList={name === '大小' ? location.sizeDisplay.comboList : location.oddEvenDisplay.comboList}
        />
    ))(typeNameList)
  }

  const renderLLHComboSection = (location) => {
    return (
      <ComboSection
        sectionType="LLH"
        currentLimit={currentLimit}
        handleLimitChange={props.handleLimitChange}
        typeName={'龙虎'}
        lCount={location.LLH.lCount}
        hCount={location.LLH.hCount}
        comboList={location.LLH.comboList}
        />
    )
  }

  const renderSumValueComboSection = (location) => {
    return mapWithIndex((name, index) => (
      <ComboSection
        key={index}
        sectionType="sum"
        currentLimit={currentLimit}
        handleLimitChange={props.handleLimitChange}
        typeName={name}
        bigCount={location.sumBS.bgCount}
        smallCount={location.sumBS.slCount}
        oddCount={location.sumOE.odCount}
        evenCount={location.sumOE.enCount}
        comboList={name === '大小' ? location.sumBS.comboList : location.sumOE.comboList}
        />
    ))(typeNameList)
  }

  const {
    currentLimit
  } = props
  return (
    <div>
      {
        tenThousands && <div>
          {
            renderComboSection(tenThousands)
          }
        </div>
      }

      {
        thousands && <div>
          {
            renderComboSection(thousands)
          }
        </div>
      }

      {
        hundreds && <div>
          {
            renderComboSection(hundreds)
          }
        </div>
      }

      {
        tens && <div>
          {
            renderComboSection(tens)
          }
        </div>
      }

      {
        units && <div>
          {
            renderComboSection(units)
          }
        </div>
      }

      {
        sumValues && <div>
          {
            renderSumValueComboSection(sumValues)
          }
        </div>
      }

      {
        LLH && <div>
          {
            renderLLHComboSection(LLH)
          }
        </div>
      }



    </div>
  )
}

ComboContainer.propTypes = {
  handleLimitChange: PropTypes.func.isRequired,
  currentLimit: PropTypes.number,
}

export default ComboContainer