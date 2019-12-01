import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Button, Paper } from '@material-ui/core'
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
 
const styles = {
  card: {
    minHeight: '400px',
    padding: '10px'
  },
  img: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '150px',
    height: '125px',
    margin: '25px auto'
  },
  details: {

  },
  paragraph: {
    textAlign: 'center',
    paddingBottom: '10px'
  },
  bookNow: {
    backgroundColor: 'green',
    color: 'white',
    margin: '15px auto',
    display: 'block'
  },
  formControl: {
    margin: '0 auto',
    width: '50%',
    display: 'block'
  },
  select: {
    width: '100%'
  }
}

class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      imgUrl: props.card.url,
      price: props.card.availability ? props.card.pricing[0].amount : '',
      carName: props.card.name,
      bootSpace: props.card.boot_space,
      location: '',
      locationsArray: props.card.locations,
      noOfSeats: props.card.seater,
      transmissionType: props.card.manual ? 'manual' : (props.card.manual !== undefined ? 'automatic' : ''),
      isSelected: props.isSelected,
      locationsMap: props.locationsMap,
      brand: props.card.brand,
      availability: props.card.availability === 1 ? true : false
    }
  }

  handleChange = name => event => {
    console.log(event)
    this.setState({
      [name]: event.target.value
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      isSelected: nextProps.isSelected
    })
  }

  componentDidMount () {
    console.log('availability', typeof this.state.availability)
    // console.log(this.state.locationsMap[this.state.locationsArray[0].id].name)
  }

  render () {
    var { imgUrl, price, brand, carName, location, locationsArray, locationsMap, noOfSeats, transmissionType, bootSpace, availability } = this.state
    var style = {
      backgroundImage: `url(${imgUrl})`
    }
    const classes = this.props.classes
    return (
      <Paper className={classes.card}>
        <div className={classes.img} style={style}></div>
        <div className={classes.details}>
        <h3 className={classes.paragraph}>{brand} {carName}</h3>
        <p className={classes.paragraph}>No of seats: {noOfSeats}</p>
        {transmissionType !== '' && <p className={classes.paragraph}>Tansmission: {transmissionType}</p>}
        <p className={classes.paragraph}>Boot space: {bootSpace} Bags</p>
        { availability && <p className={classes.paragraph}>Price: <b>{price}</b></p> }
        {locationsArray && locationsArray.length && <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Pickup Location</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={location}
            onChange={this.handleChange('location')}
            className={classes.select}
          >
            {locationsArray.map((location, index) => {
              return (<MenuItem key={index} value={location.id} >{locationsMap[location.id].name}</MenuItem>)
            })}
          </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>}
        </div>
        <Button
          variant='contained'
          size='medium'
          className={classes.bookNow}
          disabled={!this.state.availability}
          onClick={this.handleOpen}>
          Book Now
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Thank you for choosing us, looking forward to server you.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Paper>
    )
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Card)
