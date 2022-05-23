import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UserContext from '../../providers/UserContext.js';
import axios from 'axios';
import Logo from '../../Imgs/Logo.js';
import Cart from '../../Imgs/Cart.js';

export default function Header({ cartAmount }) {

    const { infoNumber, setInfoNumber, infoUsername, setInfoUsername, infoStreet, setInfoStreet, token, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [search, setSearch] = React.useState('');
    const [isHidden, setIsHidden] = React.useState('none');
    const [products, setProducts] = React.useState([]);
    const [sum, setSum] = React.useState(0);

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

    async function handleClickCart() {
        setIsHidden('block');
        const list = JSON.parse(localStorage.getItem('products'));
        setProducts(list);
        let sumAux = 0;
        for(let i = 0; i< list.length;i++){
            sumAux += parseInt(list[i].price)*parseInt(list[i].quantity);
        }
        setSum(sumAux);
    }
    async function handleClickX() {
        setIsHidden('none');
    }

    function CartProducts(){
        if (products.length > 0){
            return (
                products.map(product => {
                    return(
                        <CartProductsDiv>
                            <h3>
                                {product.name}
                            </h3>
                            <h3>
                                {product.quantity} x {product.price}
                            </h3>
                        </CartProductsDiv>
                    )
                })
            )
        }
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
                    <Button onClick={handleClickCart}>
                        <Cart />
                        <Amount>
                            <h4>{cartAmount}</h4>
                        </Amount>
                    </Button>
                </User>
            </Content>
            <Separator />
            <CartDiv isHidden = {isHidden}>
                <CloseButton onClick={handleClickX}>
                    <h1>X</h1>
                </CloseButton>
                <BackgroudWhite>
                    <h1>
                        Carrinho
                    </h1>
                    <CartCompleted>
                        <CartProducts />
                        <CartSeparator />
                        <CartTotal>
                            <h3>Total:</h3>
                            <h3>R${sum}</h3>
                        </CartTotal>
                        <CartButton>
                            <h3>
                                Finalizar Pedido
                            </h3>
                        </CartButton>
                    </CartCompleted>
                </BackgroudWhite>
            </CartDiv>
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
const CartDiv = styled.div`
    display: ${props => props.isHidden};
    position: fixed;
    background-color: rgba(0, 0, 0, 0.80);
    height: 100%;
    width: 100%;
    right: 0;
    top: 0;
    z-index: 1;
`;
const BackgroudWhite = styled.div`
    height: 100%;
    background-color: white;
    width: 400px;
    right: 0;
    position: fixed;
    overflow-y: scroll;
    text-align: center;
    padding: 20px;
`;
const CloseButton = styled.button`
    position: fixed;
    margin-right: 415px;
    top: 10px;
    right: 0;
    h1{
        color: white;
    }
`;
const CartCompleted = styled.div`
    margin-top: 30px;
    border: 1px solid #7B30F5;
    width: 100%;
    padding: 10px;
`;
const CartProductsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const CartSeparator = styled.div`
    border: 1px solid #7B30F5;
    margin: 20px; 0px;
`;
const CartTotal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const CartButton = styled.button`
    margin-top: 10px;
    background-color: #7B30F5;
    width: 100%;
    padding: 10px 20px;
    border-radius: 15px;
    h3{
        color: white;
    }
`;