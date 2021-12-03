// This file is part of antd-modal
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.antd-modal/blob/master/LICENSE

import {createElement as h, useState} from 'react'
import AntDModal from 'antd/lib/modal'


// https://stackoverflow.com/a/4819886
function isTouchDevice() {
  return ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)
}


export function Save({
  title, width, saveText, okButtonProps, maskClosableOnTouch = true,
  saveLoading, children, handleSave, handleClosed,
}) {
  const [state, setState] = useState({
    visible: true,
    saving: false,
  })

  return h(AntDModal, {
    title,
    width,
    okText: saveText,
    visible: state.visible,
    maskClosable: Boolean(maskClosableOnTouch) || !isTouchDevice(),
    destroyOnClose: true,
    confirmLoading: saveLoading || state.saving,
    okButtonProps,
    onOk: (event) => handleOk(event, setState, handleSave),
    onCancel: () => handleCancel(state.saving, setState),
    afterClose: () => handleClosed2(setState, handleClosed),
    children,
  })
}


async function handleOk(event, setState, handleSave) {
  await setState({
    visible: true,
    saving: true,
  })

  try {
    await handleSave(event)
  } catch (error) {
    return setState({
      visible: true,
      saving: false,
    })
  }
  return setState({
    visible: false,
    saving: false,
  })
}


function handleCancel(saving, setState) {
  if (!saving) {
    return setState({
      visible: false,
      saving: false,
    })
  }
  return null
}


async function handleClosed2(setState, handleClosed) {
  await handleClosed()
  return setState({
    visible: true,
    saving: false,
  })
}
