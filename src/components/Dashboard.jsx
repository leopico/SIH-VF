import React from 'react'
import styled from 'styled-components'
import NavBar from './NavBar'

const Section = styled.div`
    width: 100%;
    height: 1197px;
    background-image: url('/UserDashboard.svg');
    background-repeat: no-repeat;
    background-size: cover;    
    `

function Dashboard() {
  return (
    <>
    <NavBar />
    <Section>
    </Section>
      
    </>
    )
}

export default Dashboard