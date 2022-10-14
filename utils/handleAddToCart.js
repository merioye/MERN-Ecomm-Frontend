import { showErrorAlert } from "redux/alertSlice";
import { updateCart } from "redux/cartSlice";


const handleAddToCart = (type, product, count, setCount, dispatch)=>{

    if(type==='inc'){
       
        if(product.stock===0){
            dispatch(showErrorAlert('Product is out of stock at the moment'));
            return;
        }
        if(product.stock<=count){
            dispatch(showErrorAlert(`Only ${product.stock} quantity available`));
            return;
        }

        dispatch(updateCart(count, setCount, product, 'inc'));
        
    }
    else if(type==='dec'){
        dispatch(updateCart(count, setCount, product, 'dec'));
    }
}

export default handleAddToCart; 