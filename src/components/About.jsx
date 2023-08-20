import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
`
const Container = styled.div`
    width: 1400px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;`

const FlexDiv1 = styled.div`
flex: 1;

`
const   FlexDiv2 = styled.div`
flex: 3;
`
const FlexDiv3 = styled.div`
flex: 3;`

const TextContainer = styled.div`
    width: 100%;
    height: 100%;`


    

    

function About() {
  return (
    <Section>
      <Container>
        <FlexDiv1></FlexDiv1>
        <FlexDiv2>adadad</FlexDiv2>
        <FlexDiv3>adada</FlexDiv3>
      </Container>
    </Section>
     )
}

export default About