import React from 'react'
import MainContent from './MainContent'
import CoverImg from './CoverImg'

const Home = () => {
  return (
    <div className="wrapper">
    <CoverImg/>
    {/* <About id="about"/> */}
    <MainContent id="main-content"/>
    {/* <Dataset id="dataset"/> */}
    {/* <Team id="team"/> */}
    </div>
  )
}

export default Home