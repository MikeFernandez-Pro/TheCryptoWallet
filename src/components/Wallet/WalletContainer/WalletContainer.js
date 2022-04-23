import {useSelector} from "react-redux"
import TokenSummary from "../TokenSummary/TokenSummary"

import classes from "./WalletContainer.module.css"
import { Fragment } from "react/cjs/react.production.min";

const WalletContainer = (props) => {
    
    const walletTokens = useSelector( (state) => state.wallet.value)

    return (
        <Fragment>
        <ul className={classes.wallet}>
            {
                    walletTokens.map((token, index) => {
                        
                        return (
                            <TokenSummary
                                token={token}
                                key={token.id}
                                index={index}
                            />
                        );
                    }
                )
            }
        </ul>
        </Fragment>
    );
};

export default WalletContainer;