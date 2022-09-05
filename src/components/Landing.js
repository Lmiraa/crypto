import React,{useEffect,useState} from 'react';

//API
import { getCoin } from '../services/api';

//gif
import spiner from "../gif/spiner.gif";

//components
import Coin from './Coin';

//styles
import styles from "../components/Landing.module.css";

const Landing = () => {

// the value of the search field 
    const [coins,setCoins] = useState([]);

     // the search result
    const [search,setSearch]=useState("");

    useEffect(() => {
        const fetchAPI = async () =>{
            const data = await getCoin();
           setCoins(data)
        }
        fetchAPI()
    },[])
    
    const searchHandeler = event => {
       setSearch(event.target.value)
    }
    const searchedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase())) 

    return (
       <>
       <input  className={styles.input} type="text" placeholder="search..." value={search} onChange={searchHandeler}/>
       {
        coins.length ?
        <div className={styles.coinContainer}>
        {
            searchedCoins.map(coin => <Coin 
                key={coin.id}
                name={coin.name}
                image={coin.image}
                symbol={coin.symbol}
                price={coin.current_price}
                marketCap={coin.market_cap}
                priceChange={coin.price_change_percentage_24h}
                />)
        }
       </div> :
       <img className={styles.spiner} src={spiner} alt="loding" />
       
       }
       
       </>
    );
};

export default Landing;