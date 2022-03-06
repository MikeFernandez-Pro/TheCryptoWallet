import {useSelector} from "react-redux"
import TokenSummary from "../TokenSummary/TokenSummary"
import ItemsLegend from "../ItemsLegend/ItemsLegend";

import classes from "./WalletContainer.module.css"
import { Fragment } from "react/cjs/react.production.min";

const WalletContainer = (props) => {
    
    const walletTokens = useSelector( (state) => state.wallet.value)

    return (
        <Fragment>
        <ItemsLegend />
        <ul className={classes.wallet}>
            {
                    walletTokens.map((token) =>
                        <TokenSummary
                            token={token}
                            key={token.id}
                        />
                )
            }
        </ul>
        </Fragment>
    );
};

export default WalletContainer;