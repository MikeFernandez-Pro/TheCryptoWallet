import { useDispatch } from "react-redux";
import { fetchWallet } from "../store/wallet-actions";

const useSendDataToWallet = async (itemKey, pathAttribut, requestType, bodyContent) => {

      const dispatch = useDispatch();
      const URL = itemKey ?
            "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet/" + itemKey + pathAttribut + ".json":
            "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet.json";

      try {
            const response = await fetch(URL, {
                  method: requestType,
                  body: JSON.stringify(bodyContent),
                  headers: {
                        'Content-Type': 'application/json'
                  }
            });
            
            if (!response.ok) {
                  throw new Error('An error occurred : Failed to communicate with database')
            }

            dispatch(fetchWallet());

      } catch (error) {
            window.alert('An error occurred : Failed to communicate with database');
      }
}


export default useSendDataToWallet;