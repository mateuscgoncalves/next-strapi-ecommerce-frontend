import Head from "next/head";
import {useContext,useState, useEffect} from "react";
import Link from "next/link";

import {API_URL} from "../utils/urls";
import AuthContext from "../context/AuthContext";

const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const fetchOrders = async () => {
            if(user)
            {
                try {
                    setLoading(true);
                    const token = await getToken();
                    const orders_res = await fetch(`${API_URL}/orders`,{
                        headers:{
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await orders_res.json();
                    setOrders(data);
                }catch (e){
                    setOrders([]);
                }
                setLoading(false);
            }
        }
        fetchOrders();
    }, [user]);
    return ({orders, loading});
}

export default function Account(){

    const { user, logoutUser, getToken } = useContext(AuthContext);
    const {orders, loading} = useOrders(user, getToken);
    console.log("Account.render orders", orders);
    if(!user){
        return(
            <div>
                <p>Please login or register</p>
                <Link href="/"><a>Go back</a></Link>
            </div>
        );
    }

    return(
        <div>
            <Head>
                <title>Account page</title>
                <meta name="description" content="The account page, view your orders and logout"/>
            </Head>
            <h2>Account page</h2>
            <h3>Your orders</h3>
            {loading && <p>Loading your orders...</p>}
            {orders?.map(order => (
                <div key={order.id}>
                    {new Date(order.created_at).toLocaleDateString('pt-BR')}{order.product.name} ${order.total} {order.status}
                </div>
            ))
            }
            <hr/>
            <a href="#" onClick={logoutUser}>Logout</a>
        </div>
    );
}