import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import { useNavigate } from 'react-router';
import UserContext from '../../providers/UserContext';

export default function ListProductsPage() {

    const params = useParams();

    const {token, setToken} = useContext(UserContext);
    const [dataList, setDataList] = React.useState([]);
    
    const navigate = useNavigate();

    const fetchData = async () => {
        const promise = await axios.get(`http://localhost:5000/${params.category}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const { data } = promise;
        setDataList(data);
    }

    useEffect(() => {
        try{
            fetchData();
        }
        catch(e){
            alert('Falha.');
        }
    }, []);

    async function handleClickDrink(name){
        let routeName = '';
        for(let i =0; i< name.length;i++){
            if(name[i] == " "){
                routeName += "-";
            }
            else{
                routeName += name[i];
            }
        }
        navigate(`/${params.category}/${routeName.toLowerCase()}`);
    }

    function DrinksButtons(){
        if (dataList.length > 0){
            return (
                dataList.map(drink => {
                    return(
                        <DrinkCompleted>
                            <DrinkBorder>
                                <Separator />
                                <Drink onClick={() => {handleClickDrink(drink.name)}}>
                                    <img src = {`../imgs/${drink.name.toLowerCase()}.png`} />
                                </Drink>
                            </DrinkBorder>
                            <h2>{drink.name}</h2>
                        </DrinkCompleted>
                    )
                })
            )
        }
    }

    return (
        <>
            <Header />
            <Content className = "container">
                <h1>{params.category[0].toUpperCase() + params.category.slice(1)}</h1>
                <Drinks>
                    <DrinksButtons />
                </Drinks>
            </Content>
            <Footer />
        </>
    )
}

const Content = styled.div`
    margin-top: 50px;
`;
const Drinks = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const DrinkCompleted = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 15px;
    padding: 0px;
`;
const DrinkBorder = styled.div`
    border: 2px solid #eee;
    margin-top: 10px;
    width: 160px;
    height: 180px;
    border-radius: 15px;
`;
const Separator = styled.div`
    width: 100%;
    height: 140px;
`;
const Drink = styled.div`
    background-color: #7B30F5;
    height: 40px;
    width: 100%;
    border-radius: 0px 0px 15px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    h2{
        color: white;
    }
    img{
        height: 150px;
        margin-top: -144px;
    }
`;