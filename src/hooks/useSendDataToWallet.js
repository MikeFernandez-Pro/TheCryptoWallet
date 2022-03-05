import { useDispatch } from "react-redux";
import { fetchWallet } from "../store/wallet-actions";

const useSendDataToWallet = async (itemKey, pathAttribut, requestType, bodyContent) => {

      const dispatch = useDispatch();
    const URL = itemKey ?
    "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet/" + itemKey + pathAttribut + ".json":
    "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet.json";

    const response = await fetch(URL, {
        method: requestType,
        body: JSON.stringify(bodyContent),
        headers: {
              'Content-Type': 'application/json'
            }
      });
      dispatch(fetchWallet());
}


export default useSendDataToWallet;