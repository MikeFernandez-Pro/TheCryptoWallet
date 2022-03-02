import {useSelector} from "react-redux"

const List = (props) => {

    const tokensList = useSelector( (state) => state.wallet.tokensList)

    return (
        <datalist id="tokens">
            {
                props.inputValue && tokensList.map((item) => 
                    <option key={item.id} value={item.name}>
                      ({item.symbol})
                    </option>
                )
             }
        </datalist>
    );

};

export default List;