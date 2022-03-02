const useSendDataToWallet = async (tokenKey, pathAttribut, requestType, bodyContent, updateWallet) => {

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
      await updateWallet();
}


export default useSendDataToWallet;