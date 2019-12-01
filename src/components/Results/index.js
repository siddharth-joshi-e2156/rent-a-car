import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import ReactPaginate from 'react-paginate'
import { TextField, ButtonGroup, Button } from '@material-ui/core'
import Card from '../Card'

const styles = {
  results: {
    paddingTop: '30px'
  },
  buttonGroup: {
    display: 'block',
    padding: '25px 0'
  },
  search: {
    width: '222px',
    marginBottom: '30px',
    marginTop: '0'
  },
  sortingBar: {
    backgroundColor: 'white',
    padding: '10px 20px'
  },
  sortLabel: {
    marginRight: '40px'
  },
  sortingOptions: {
    display: 'inline-block',
    marginRight: '40px',
    padding: '5px 0'
  },
  selectedOption: {
    backgroundColor: 'lightblue'
  },
  activeFilter: {
    backgroundColor: 'white'
  },
  filterOption: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)'
    }
  }
}

class Results extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: '',
      results: props.results,
      filterList: props.results,
      test: [],
      pageCount: 6,
      filterType: '',
      search: ''
    }
  }

  setItemsOfPage = () => {
    console.log('setting')
  }

  filterList = (val) => {
    var actualList = this.state.results
    actualList = actualList.filter((item) => {
      if (val === 'manual') {
        return item.manual
      } else {
        if (item.manual !== undefined && !item.manual) {
          return true
        } else {
          return false
        }
      }
    })

    console.log(actualList.length)
    this.setState({
      filterType: val === 'manual' ? 'manual' : 'automatic',
      filterList: actualList
    })
  }

  compare = (a, b) => {
    if (a.availability && b.availability) {
      return (a.pricing[0].amount - b.pricing[0].amount)
    } else {
      return 1
    }
  }

  handleChange = name => event => {
    var searchText = (event.target.value).toLowerCase()
    console.log(searchText)
    var actualList = this.state.results
    actualList = actualList.filter((item) => {
      if (item.brand.toLowerCase().indexOf(searchText) >= 0 || item.name.toLowerCase().indexOf(searchText) >= 0) {
        return true
      } else {
        return false
      }
    })
    console.log(actualList)
    this.setState({
      [name]: event.target.value,
      filterList: actualList
    })
  }

  sortList = (option) => {
    this.setState({
      filterList: option === 2 ? this.state.filterList.sort(this.compare).reverse() : this.state.filterList.sort(this.compare),
      sortOption: option
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      results : nextProps.results,
      filterList: nextProps.results
    })
  }

  render () {
    var { results, filterList, sortOption, filterType } = this.state
    const classes = this.props.classes
    return (
      <Fragment>
        <ButtonGroup className={classes.buttonGroup} aria-label="small outlined button group">
          <Button className={`${classes.filterOption} + ${filterType === 'automatic' ? classes.activeFilter : ''}`} onClick={() => this.filterList('automatic')}>Automatic</Button>
          <Button className={`${classes.filterOption} + ${filterType === 'manual' ? classes.activeFilter : ''}`} onClick={() => this.filterList('manual')}>Manual</Button>
        </ButtonGroup>
        <TextField
          label='Search'
          className={classes.search}
          value={this.state.search}
          type='search'
          margin='normal'
          onChange={this.handleChange('search')}
        />
        <div className={classes.sortingBar}>
          <span className={classes.sortLabel}>Sort By:</span>
          <div className={`${classes.sortingOptions} + ${sortOption === 1 ? classes.selectedOption : '' }`} onClick={() => {this.sortList(1)}}>Price: Low to High</div>
          <div className={`${classes.sortingOptions} + ${sortOption === 2 ? classes.selectedOption : '' }`} onClick={() => {this.sortList(2)}}>Price: High to Low</div>
        </div>
        <Grid>
          <section className={classes.results}>
            <Grid container justify="space-around" spacing={3}>
              {filterList.map((card, index) => {
                return (<Grid key={card.name} item xs={12} sm={4} md={4} lg={4}>
                          <Card card={card} locationsMap={this.props.locationsMap} />
                        </Grid>)
              })}
            </Grid>
          </section>
        </Grid>
      </Fragment>
    )
  }
}

Results.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Results)
