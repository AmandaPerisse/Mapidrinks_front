import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UserContext from '../../providers/UserContext.js';
import axios from 'axios';
import Logo from '../../Imgs/Logo.js';
import Cart from '../../Imgs/Cart.js';

export default function Header() {

    const { infoNumber, setInfoNumber, infoUsername, setInfoUsername, infoStreet, setInfoStreet, token, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [search, setSearch] = React.useState('');
    async function handleSearch(e){
        e.preventDefault();
        /*if(searchFor === "disciplina"){
            setType(0);
        }
        else if (searchFor === "professor"){
            setType(1);
        }
        navigate("/search");*/
    }

    async function handleLogout() {
        try{
            const response = await axios.post('http://localhost:5000/logout', {
                token: token,
            });
        }
        catch(e){
            alert('Erro ao delogar.');
        }
        setToken(null);
        setInfoStreet(null);
        setInfoNumber(null);
        setInfoUsername(null);
        localStorage.removeItem('token');
        localStorage.removeItem('infoNumber');
        localStorage.removeItem('infoUsername');
        localStorage.removeItem('infoStreet');
        navigate("/");
    }

    return (
        <>
            <Content className = "container">
                <Logo />
                <Form onSubmit = {handleSearch}>
                    <input type="text" onChange = {(e) => setSearch(e.target.value)} value = {search} placeholder="Pesquise no Mapi"/>
                </Form>
                <User>
                    <div>
                        <h3>Olá, {infoUsername}</h3>
                        <h3>Rua {infoStreet}, {infoNumber}</h3>
                    </div>
                    <Button>
                        <Cart />
                        <Amount>
                            <h4>1</h4>
                        </Amount>
                    </Button>
                </User>
            </Content>
            <Separator />
        </>
    )
}
const Content = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    input{
        width: 500px;
    }
`;
const Separator = styled.div`
    width: 100%;
    background-color: #c9c9c9;
    height: 1px;
`;
const User = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
`;
const Button = styled.button`
    img{
        height: 20px;
    }
`;
const Amount = styled.div`
    background-color: #79F518;
    height: 15px;
    width: 15px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-top: -8px;
    margin-left: 14px;
`;