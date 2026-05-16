import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button> Novo Simulado
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   font-size: 21px;
   padding: 0.5em 2em;
   border: transparent;
   box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
   background: #059669;
   color: black;
   border-radius: 8px;
  }

  button:hover {
   background: rgb(2,0,36);
   background: linear-gradient(90deg, #059669 0%, rgba(0,212,255,1) 100%);
  }

  button:active {
   transform: translate(0em, 0.2em);
  }`;

export default Button;
