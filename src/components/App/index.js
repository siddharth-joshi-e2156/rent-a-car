import React from 'react'
import './App.css'
import Nav from '../Nav/nav'
import Container from '@material-ui/core/Container'
import Layout from '../Layout'

function App () {
  return (
    <div className='app'>
      <Nav />
      <Container maxWidth='lg'>
        <Layout />
      </Container>
    </div>
  )
}

export default App
