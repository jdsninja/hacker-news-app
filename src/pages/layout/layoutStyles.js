import styled from 'styled-components';

export const Container = styled.div`
margin: 0 auto;
width: 940px;
padding-top: 10px;
background-color: lightgray;
font-family: 'Roboto', sans-serif;
font-size: 14px;
button{
font-size: 14px;
cursor: pointer;
}
@media screen and (max-width: 939px) {
    padding: 10px 0;
    width: auto;
}
`;
