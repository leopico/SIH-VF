import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
margin-top: 20px;
    width: 100%;
    height: 100vh;
    display: flex;
/* background-color: #d21b1b; */
    justify-content: center;
    align-items: center;`

const Container = styled.div`
    width: 100%;    
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #e1d3d3; */
    flex-direction: column;
    background-image: url('/Component2.svg');
    background-repeat: no-repeat;
    background-size: cover,
   `

    const HeroText = styled.div`
    flex: 1;
    width: 50%;
    height: 10%;
        display: flex;
    justify-content: center;
    font-size: 84px;
    align-items: center;
    /* background-color: #5f1a7c; */
    color: #224E34;
text-align: center;
text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
font-family: 'Inter', sans-serif;
font-style: normal;
font-weight: 800;
letter-spacing: 6px;
    `

const HeroPara = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
/* background-color: #7c441a; */
color: #3D4917;
text-align: center;
font-family: 'Inter', sans-serif;
font-size: 40px;
font-style: normal;
font-weight: 700;
line-height: 166.523%; /* 79.931px */
`
const HeroButton = styled.div`
width: 50%;
flex: 1;
height: 50%;
display: flex;
justify-content: center;
align-items: flex-start;
flex-wrap: wrap;


/* background-color: #1a7c55; */

`   
const Button = styled.button`
display: flex;
width: 270px;
height: 68px;
justify-content: center;
align-items: center;
flex-shrink: 0;
border-radius: 29px;
opacity: 0.9;
background: #75D63A;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
border: none;
color: #FFF;
text-align: center;
font-family: 'Inter', sans-serif;
font-size: 36px;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: 2.7px;`

const imgBacks = styled.img`
`



function Hero() {
  return (
    <Section>
            <Container>
            <imgBacks></imgBacks>
                <HeroText>Virtual <br/>Forest</HeroText>
                <HeroPara>Where NFTs and Conservation Unite<br/> for a Greener Future</HeroPara>
                <HeroButton><Button>Play Now</Button> </HeroButton>
            </Container>

    </Section>
  )
}

export default Hero