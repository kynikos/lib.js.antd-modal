// This file is part of antd-modal
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.antd-modal/blob/master/LICENSE

const {Children, Component, createElement: h} = require('react')
const AntDModal = require('antd/lib/modal').default


class Save extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      saving: false,
    }
  }

  render() {
    const {title, width, saveText, children} = this.props
    const {visible, saving} = this.state

    return h(AntDModal, {
      title,
      width,
      okText: saveText,
      visible,
      destroyOnClose: true,
      confirmLoading: saving,
      onOk: this.handleOk,
      onCancel: this.handleCancel,
      afterClose: this.handleClosed,
    }, Children.toArray(children))
  }

  handleOk = async (event) => {
    this.setState({saving: true})
    try {
      await this.props.handleSave(event)
    } catch (error) {
      return this.handleNotSaved(event)
    }
    return this.handleSaved(event)
  }

  handleSaved = (event) => {
    this.setState({
      visible: false,
      saving: false,
    })
  }

  handleNotSaved = (event) => {
    this.setState({
      saving: false,
    })
  }

  handleCancel = (event) => {
    if (!this.state.saving) this.setState({visible: false})
  }

  handleClosed = () => {
    this.props.handleClosed()
    this.setState({visible: true})
  }
}

module.exports = {
  Save,
}
