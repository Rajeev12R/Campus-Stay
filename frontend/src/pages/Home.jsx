import React from 'react'
import Header from '../components/Header'
import Feature from '../components/Feature'
import FAQ from '../components/FAQ'
// import Demo from '../components/Demo'
const Home = () => {
  return (
    <div>
        <Header/>
        <Feature/>
        {/* <Demo/> */}
        <FAQ/>
    </div>
  )
}

export default Home