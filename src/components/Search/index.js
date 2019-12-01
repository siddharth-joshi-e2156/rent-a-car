import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Results from '../Results'
import { TextField, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import Loader from '../Loader'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import axios from 'axios'
 
const styles = {
  location: {
    minWidth: '222px'
  },
  submitButton: {
    color: '#fff',
    width: '222px',
    height: 'fit-content',
    alignSelf: 'center'
  },
}

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: 'chennai',
      startDate: new Date(),
      endDate: new Date(((new Date()).setDate(new Date().getDate() + 1))),
      actualStartTime: '',
      actualEndTime: '',
      carList: [],
      locationsMap: {}
    }
  }

  handleChange = name => event => {
    var actualVal, actualStartTime, actualEndTime
    if (name === 'startDate' || name === 'endDate') {
      var mm = event.getMonth() + 1;
      var dd = event.getDate();
      var yyyy = event.getFullYear();
      actualVal = yyyy + '-' + mm + '-' + dd
    } 
    // else if (name === 'startTime') {
    //   actualStartTime = event.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    // } else if (name === 'endTime') {
    //   actualEndTime = event.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    // } 
    else {
      actualVal = event.target.value
    }
    this.setState({
      [name]: actualVal
    })
  }

  handleSubmit = () => {
    this.setState({
      isLoading: true
    })
    // var url = `https://api.zoomcar.com/v4/search?lat=22.5089709&lng=88.3329766&starts=${this.state.startDate}` + encodeURIComponent(` ${this.state.actualStartTime}`) + `&ends=${this.state.endDate}` + encodeURIComponent(` ${this.state.actualEndTime}`) + `&type=zoom_later&bracket=with_fuel&platform=web&version=2&device_id=000&device_name=000&city=${this.state.location}&zap=true`
    var url = `https://api.zoomcar.com/v4/search?lat=22.5089709&lng=88.3329766&starts=${this.state.startDate}&ends=${this.state.endDate}&type=zoom_later&bracket=with_fuel&platform=web&version=2&device_id=000&device_name=000&city=${this.state.location}&zap=true`
    axios.get(url).then((response) => {
      var carList, locationsMap
      carList = response.data.result
      locationsMap = response.data.locations_map
      carList.forEach((item) => {
        let availability = item.availability
        item.cars.forEach((car) => {
          car.availability = availability
        })
      })
      carList = carList[0].cars //carList[0].cars.concat(carList[1].cars) to list unavailable cars as well
      console.log(carList)
      this.setState({
        carList,
        locationsMap,
        isLoading: false
      })
    })
  }

  render () {
    const classes = this.props.classes
    var { carList, locationsMap, isLoading } = this.state
    return (
      <section>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <TextField
                label='Location'
                className={classes.location}
                value={this.state.location}
                margin='normal'
                onChange={this.handleChange('location')}
              />
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Start Date"
                format="yyyy-MM-dd"
                value={this.state.startDate}
                onChange={this.handleChange('startDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change start date',
                }}
              />
              {/* <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Start Time"
                value={this.state.selectedTime}
                onChange={this.handleChange('startTime')}
                KeyboardButtonProps={{
                  'aria-label': 'change start time',
                }}
              /> */}
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="End Date"
                format="yyyy-MM-dd"
                value={this.state.endDate}
                onChange={this.handleChange('endDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change end date',
                }}
              />
              <Button 
                variant='contained'
                size='medium'
                color='primary'
                className={classes.submitButton}
                onClick={this.handleSubmit}>
                Submit
              </Button>
              {/* <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="End Time"
                value={this.state.selectedTime}
                onChange={this.handleChange('endTime')}
                KeyboardButtonProps={{
                  'aria-label': 'change end time',
                }}
              /> */}
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        { (carList.length === 0 || isLoading) &&  <Loader /> }
        { (carList.length > 0 && !isLoading  )&& 
          <div>
            <Results results={carList} locationsMap={locationsMap} />
          </div>}
      </section>
    )
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Layout)
