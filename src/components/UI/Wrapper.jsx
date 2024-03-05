import React from 'react'
import styled from 'styled-components'

const Wrapper = ({ children, width, height, padding, margin, id }) => {
   // const [state, setState] = React.useState(0)
   return (
      <Container
         id={id}
         width={width}
         height={height}
         padding={padding}
         margin={margin}
      >
         {children}
      </Container>
   )
}

const Container = styled.div`
   width: ${(props) => props.width};
   height: ${(props) => props.height};
   padding: ${(props) => props.padding};
   margin: ${(props) => props.margin};
   border-radius: 10px;
   border: 1px solid #d4d4d4;
   background-color: #ffff;
`
export default Wrapper
