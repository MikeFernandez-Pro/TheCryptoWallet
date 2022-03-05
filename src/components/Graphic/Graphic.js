import { useContext } from "react";
import { VictoryPie, VictoryLabel} from "victory";
import {useSelector } from "react-redux"
import ThemeContext from "../../store/Theme/theme-context";

const Graphic = (props) => {

   const themeCtx = useContext(ThemeContext)
  const totalValue = useSelector( (state) => state.wallet.totalValue);
  const showValue = useSelector( (state) => state.wallet.showValue);

    const graphColor = themeCtx.lightTheme ? "qualitative" : ["#36213E", "#A379C9","#717E95","#52D1DC","#44798D",
    "#A5F8D3", "#596389", "#7BA5D3", "#9E829C", "#9E829C"]
    const fillGraph = themeCtx.lightTheme ? "black" : "white"
    return (
      <div>
        <svg viewBox="-100 0 600 400">
        <VictoryPie
        standalone={false}
        data={props.dataGraph}
        colorScale={graphColor}
        innerRadius={70}
        labels={({ datum }) => datum.x }
        labelPlacement="perpendicular"
        animate={{ duration: (500), easing: "bounce" }}
        padAngle={({ datum }) => 2}
        style={{
            data: {
              fillOpacity: 0.9
            },
            labels : {
                fill: fillGraph,
                fontSize: "16",
                fontWeight: "bold"
            }
          }}
          events={[{
            target: "data",
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    target: "data",
                    mutation: (props) => {
                      return { radius: 170, innerRadius: 50, padAngle: 5};
                    }
                  }, {
                    target: "labels",
                    mutation: (props) => {
                      return { 
                            text: props.datum.y + "%",
                            style: {fill: fillGraph, fontSize: "20", fontWeight: "bold" },                        
                        };
                    }
                  }
                ];
              },
              onMouseOut : () => {
                return [
                  {
                    target: "data",
                    mutation: ({ style }) => {
                      return null;
                    }
                  }, {
                    target: "labels",
                    mutation: ({ text }) => {
                      return  null ;
                    }
                  }
                ];
              }
            }
          }]}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 18, fill: fillGraph}}
          colorScale={graphColor}
          x={200} y={200}
          text={showValue ? totalValue.toFixed(2).toString() + "$" : "********"}
          events={{onClick: () => [{
            target: "data",
            mutation: (props) => {
              return props.text === "clicked" ?
                null : { text: "clicked" }
            }
          }]}}
        />  
        </svg>
        </div>
    );
};

export default Graphic;