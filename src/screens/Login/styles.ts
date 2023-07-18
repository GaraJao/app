import styled from 'styled-components/native'

export const Container = styled.View`
    padding: 0 23px;
    padding-top: 70px;
    flex: 1;
    background-color: #FFFDFC;
`;

export const Logo = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 20px;
`;

export const Image = styled.Image`
    width: 430px;
    height: 430px;
    bottom: 35px;
    left: -130px;
    z-index: -10;
`;

export const Title = styled.Text`
    margin-top: 20px;
    font-size: 45px;
    font-family: Roboto;
    font-weight: 700;
    color: #615148;
`;

export const Subtitle = styled.Text`
    font-size: 18px;
    font-family: Roboto;
    font-weight: 200;
    color: #615148;
`;

export const Input = styled.TextInput.attrs({
        placeholderTextColor: "#A4A4A4"
    })`
    margin-top: 15px;
    padding: 5px 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #C5C5C5;
    background-color: #FFFDFC;
`;

export const Button = styled.TouchableOpacity`
    background-color: #A86D4A;
    align-self: flex-end;
    border-radius: 8px;
    width: 130px;
    height: 38px;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-size: 14px;
    font-family: Roboto;
    font-weight: 700;
    color: #fff;
`;