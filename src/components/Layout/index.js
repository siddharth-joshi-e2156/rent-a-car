import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import './layout.css'

const styles = {
  button: {
    marginTop: '16px',
    float: 'right'
  },
  textField: {
    width: '100%'
  },
  dialogContent: {
    padding: '25px'
  }
}

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boardAvailable: false,
      title: '',
      open: false
    }
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  createBoard = () => {
    this.setState(state => ({
      open: false,
      title: state.title,
      boardAvailable: true
    }))
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render () {
    const classes = this.props.classes
    return (
      <section className='layout-wrapper'>

      </section>
    )
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Layout)
