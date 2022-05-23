import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import { useNavigate } from 'react-router';
import UserContext from '../../providers/UserContext';

export default function ProductPage({ setCartAmount, cartAmount }) {

    const params = useParams();

    const {token, setToken} = useContext(UserContext);
    const [dataList, setDataList] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [quantity, setQuantity] = React.useState(0);
    const [deliveryType, setDeliveryType] = React.useState('');
    

    let titleAux = "";

    const navigate = useNavigate();

    const fetchData = async () => {
        const promise = await axios.post(`http://localhost:5000/${params.category}`, {
            name: titleAux,
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        const { data } = promise;
        setDataList(data);
    }

    useEffect(() => {
        try{
            for(let i = 0; i<params.productName.length;i++){
                if(i == 0){
                    titleAux += params.productName[0].toUpperCase();
                }
                else if (params.productName[i] == "-"){
                    titleAux += " ";
                }
                else if(params.productName[i-1] == "-"){
                    titleAux += params.productName[i].toUpperCase();
                }
                else{
                    titleAux += params.productName[i];
                }
            }
            setTitle(titleAux);
            fetchData();
        }
        catch(e){
            alert('Falha.');
        }
    }, []);

    async function handleClickSubAdd(n){
        if(n == 0){
            if(quantity > 0){
                setQuantity(quantity-1);
            }
        }
        else if (n == 1){
            setQuantity(quantity+1);
        }
        
    }
    async function handleAddToCart(){
        if(quantity > 0){
            const items1 = JSON.parse(localStorage.getItem('products'));
            const arr = [...items1, {name: title, quantity: quantity, price: dataList[0].price}];
            localStorage.setItem('products', JSON.stringify(arr));
            const items2 = JSON.parse(localStorage.getItem('products'));
            setCartAmount(items2.length);
        }
    }

    if(dataList.length > 0){
        return (
            <>
                <Header cartAmount = {cartAmount}/>
                <Title>
                    <div className = "container">
                        <h1>{title}</h1>
                    </div>
                </Title>
                <Content className = "container">
                    <Left>
                        <img src = {`../imgs/${title.toLowerCase()}.png`} />
                    </Left>
                    <Right>
                        <h2>
                            Já pensou em receber um drink pré pronto em casa?
                        </h2>
                        <h2>
                        Escolha entre receber em uma garrafa ou em sachês para montá-lo junto a um passo a passo!
                        </h2>
                        <br />
                        <h2>
                            Ingredientes:
                        </h2>
                        <h2>
                            {dataList[0].ingredients}
                        </h2>
                        <br />
                        <h2>
                            Modo de Preparo:
                        </h2>
                        <h2>
                            {dataList[0].preparation}
                        </h2>
                        <br />
                        <h2>
                            Preço: {dataList[0].price}
                        </h2>
                    </Right>
                </Content>
                <QntSection>
                    <SubButton onClick={() => {handleClickSubAdd(0)}}><h3>-</h3></SubButton>
                    <Number><h2>{quantity}</h2></Number>
                    <AddButton onClick={() => {handleClickSubAdd(1)}}><h3>+</h3></AddButton>
                </QntSection>
                <SelectSection>
                    <select onChange = {(e) => setDeliveryType(e.target.value)} name = "select">
                        <option disabled selected = "selected" value = "0">Escolha a forma de entrega</option>
                        <option value = "1">Garrafa</option>
                        <option value = "2">Sachê</option>
                    </select>
                </SelectSection>
                <ButtonDiv>
                    <button onClick={handleAddToCart}>
                        <h3>
                            Adicionar ao Carrinho
                        </h3>
                    </button>
                </ButtonDiv>
                <Footer />
            </>
        )
    }
}

const Title = styled.div`
    h1{
        color: #7B30F5;
    }
    border-bottom: 1px solid #7B30F5;
    padding: 50px 0px;
`;
const Content = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;
const Left = styled.div`
    width: 215px;
    img{
        margin-top: -90px;
        width: 215px;
    }
`;
const Right = styled.div`
    width: 100%;
`;
const QntSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;
`;
const Number = styled.div`
    background-color: #7B30F5;
    width: 80px;
    padding: 5px 0px;
    text-align: center;
    border-radius: 15px;
    h2{
        color: white;
    }
`;
const SubButton = styled.button`
    border: 1px solid #7B30F5;
    border-radius: 100%;
    width: 30px;
    height: 30px;
`;
const AddButton = styled.button`
    border: 1px solid #7B30F5;
    border-radius: 100%;
    width: 30px;
    height: 30px;
`;
const SelectSection = styled.div`
    margin-top: 10px;
    select{
        width: 300px;
    }
    display: flex;
    justify-content: center;
`;
const ButtonDiv = styled.div`
    margin-top: 10px;
    margin-bottom: 80px;
    display: flex;
    justify-content: center;
    button{
        background-color: #7B30F5;
        padding: 10px 20px;
        border-radius: 15px;
    }
    h3{
        color: white;
    }
`;