// import styled from '@emotion/styled/macro'
import styled from 'styled-components'

export const RadioButton = (key, id, value, name, onChange, checked) => {
   return (
      <div>
         <StyledInput
            key={key}
            id={id}
            value={value}
            type="radio"
            name={name}
            onChange={onChange}
            checked={checked}
         />
      </div>
   )
}

const StyledInput = styled.input`
   width: 22px;
   height: 22px;
`
