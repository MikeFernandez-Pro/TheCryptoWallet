import TokenSummary from "../TokenSummary/TokenSummary"
import {useSelector} from "react-redux"
import classes from "./WalletContainer.module.css"

const WalletContainer = (props) => {
    
    const walletTokens = useSelector( (state) => state.wallet.value)

    return (
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
    )
}

export default WalletContainer;