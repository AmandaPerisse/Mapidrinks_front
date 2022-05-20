import React from 'react';
import Logo from '../../Imgs/Logo.js';
import Form from './Form';
import styled from 'styled-components';

export default function LoginPage() {

    return (
        <Content>
            <Logo />
            <Login>
                <h1><strong>
                    Login
                </strong></h1>
                <Form />
            </Login>
        </Content>
    )
}

const Content = styled.body`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 45%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    gap: 100px;
    width: 500px;
`;
const Login = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
`;