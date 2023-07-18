import styled from 'styled-components/native'

export const Container = styled.View`
    padding: 0 23px;
    padding-top: 70px;
    flex: 1;
    background-color: #FFFDFC;
`;

export const Header = styled.View`
    width: 100%;
    /* height: 40px; */
    /* flex-direction: row; */
`;

export const Logo = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 14px;
    margin-right: 10px;
`;

export const Image = styled.Image`
    width: 430px;
    height: 430px;
    bottom: 35px;
    left: -130px;
    z-index: -10;
`;

export const Title = styled.Text`
    font-size: 25px;
    font-family: Roboto;
    font-weight: 700;
    color: #615148;
`;

export const Subtitle = styled.Text`
    font: 700 14px Roboto;
    align-self: flex-start;
    color: #fff;
    padding: 3px 10px;
    border-radius: 5px;
    margin-bottom: 10px;
`;

export const Body = styled.ScrollView`
    width: 100%;
    flex-grow: 0;
    /* flex-grow: 1; */
    margin-top: 10px;
    background-color: #F1EBE7;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 30px;
`;

export const Card = styled.View`
    width: 100%;
    height: 80px;
    /* border-radius: 20px;
    overflow: hidden; */
    flex-direction: row;
    margin: 6px 0;
    /* margin-bottom: 12px; */
`;

export const ContainerImage = styled.View`
    width: 70px;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const CardImage = styled.Image`
    /* width: 70px;
    height: 70px; */
    border-radius: 40px;
    background-color: #D3CFCC;
`;

export const CardBody = styled.View`
    flex-grow: 1;
    height: 100%;
    justify-content: center;
    box-sizing: border-box;
`;

export const CardDelete = styled.View`
    height: 100%;
    justify-content: center;
    box-sizing: border-box;
    width: 55px;
`;

export const Gate = styled.Text`
    font: 700 17px Roboto;
    width: 90%;
`;

export const City = styled.Text`
    margin-top: 3px;
    max-width: 85%;
    /* margin-bottom: 6px; */
`;

export const ContainerState = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const StateCircle = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-right: 5px;
`;

export const State = styled.Text`
    margin-right: 7px;
`;

export const DateCard = styled.Text`
    font: 500 12px Roboto;
    color: #6A6A6A;
`;

export const AddressContainer = styled.View`
    margin-left: 3px;
`;

export const Address = styled.Text`
    font: 500 15px Roboto;
`;

export const GateContainer = styled.View`
    flex-direction: row;
`;