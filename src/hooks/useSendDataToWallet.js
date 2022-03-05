import { useDispatch } from "react-redux";
import { fetchWallet } from "../store/wallet-actions";

const useSendDataToWallet = async (tokenKey, pathAttribut, requestType, bodyContent) => {

      const dispatch = useDispatch();
    const URL = tokenKey ?
    "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet/" + tokenKey + pathAttribut + ".json":
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