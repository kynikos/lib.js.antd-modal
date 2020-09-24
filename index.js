// This file is part of antd-modal
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.antd-modal/blob/master/LICENSE

import {createElement as h, useState} from 'react'
import AntDModal from 'antd/lib/modal'


export function Save({
  title, width, saveText, okButtonProps, saveLoading, children, handleSave,
  handleClosed,
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
  setState({
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
    setState({
      visible: false,
      saving: false,
    })
  }
}


function handleClosed2(setState, handleClosed) {
  handleClosed()
  setState({
    visible: true,
    saving: false,
  })
}
