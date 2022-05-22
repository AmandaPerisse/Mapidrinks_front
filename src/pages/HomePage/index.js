import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../../components/Header/Header.js';
import { useNavigate } from 'react-router';
import UserContext from '../../providers/UserContext';

export default function HomePage() {

    const {token, setToken} = useContext(UserContext);
    const [dataList, setDataList] = React.useState([]);
    
    const navigate = useNavigate();

    const fetchData = async () => {
        const promise = await axios.get('http://localhost:5000/home', {
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

    async function handleClickCategory(name){
        navigate(`/${name.toLowerCase()}`);
    }

    function CategoryButtons(){
        if (dataList.length > 0){
            return (
                dataList.map(category => {
                    return(
                        <Category onClick={() => {handleClickCategory(category.name)}}>
                            <h2>{category.name}</h2>
                        </Category>
                    )
                })
            )
        }
    }

    return (
        <>
            <Header />
            <Content className = "container">
                <h1>Categorias</h1>
                <Categories>
                    <CategoryButtons />
                </Categories>
            </Content>
        </>
    )
}

const Content = styled.div`
    margin-top: 50px;
`;
const Categories = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const Category = styled.button`
    margin-top: 10px;
    background-color: #7B30F5;
    width: 150px;
    height: 100px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    h2{
        color: white;
    }
`;