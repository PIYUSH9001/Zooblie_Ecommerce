import { Children, createContext ,useState,useEffect} from "react";

const StoreContext = createContext();

const StoreProvider = ({children})=>{
    const [Data,setData] = useState(null);
    const [Cart,setCart] = useState([]);
    const FetchData = async (ProductCategory)=>{
            await fetch(`https://fakestoreapi.com/${ProductCategory}/`).then((Data)=>Data.json()).then((Data)=>setData(Data));
    };
    const isInCart = (ProductTitle) =>{
        return Cart.some(product => product.ProductTitle === ProductTitle);
    }
    return(
        <StoreContext.Provider value={
            {
                Data,
                setData,
                Cart,
                setCart,
                FetchData,
                isInCart,
            }
            }>
            {children}
        </StoreContext.Provider>
    )
}

export {StoreContext,StoreProvider};