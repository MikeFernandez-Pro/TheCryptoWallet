import { useContext } from "react";
import { VictoryPie, VictoryLabel } from "victory";
import { useSelector } from "react-redux";
import ThemeContext from "../../store/Theme/theme-context";
import EmptyIcon from "../../images/EmptyIcon.svg"
import EmptyLightIcon from "../../images/EmptyLightIcon.svg"

import classes from "./Graphic.module.css";

const Graphic = (props) => {
  const themeCtx = useContext(ThemeContext);
  const totalValue = useSelector((state) => state.wallet.totalValue);
  const showValue = useSelector((state) => state.wallet.showValue);
  const graphData = useSelector((state) => state.graphic.datas);
  const fillGraph = themeCtx.lightTheme ? "#372f47" : "white";
  const graphColor = themeCtx.lightTheme
    ? "qualitative"
    : [
        "#36213E",
        "#A379C9",
        "#717E95",
        "#52D1DC",
        "#44798D",
        "#A5F8D3",
        "#596389",
        "#7BA5D3",
        "#9E829C",
        "#9E829C",
      ];

  if (graphData.length === 0) {
    return (
      <div className={classes.empty}>
        <label style={{color: !themeCtx.lightTheme ? "#A399BA" : "#524589"}}>Wallet is currently empty</label>
        <img src={!themeCtx.lightTheme ? EmptyIcon : EmptyLightIcon} alt="Empty Icon" className={classes["empty-icon"]}/>
      </div>)
    }


  return (
    <div className={classes.graph}>
      <svg viewBox="-150 0 700 400">
        <VictoryPie
          standalone={false}
          data={graphData}
          colorScale={graphColor}
          innerRadius={70}
          labels={({ datum }) => datum.x}
          labelPlacement="perpendicular"
          animate={{ duration: 500, easing: "bounce" }}
          padAngle={({ datum }) => 2}
          style={{
            data: {
              fillOpacity: 0.9,
            },
            labels: {
              fill: fillGraph,
              fontSize: "11",
            },
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        return { radius: 170, innerRadius: 50, padAngle: 5 };
                      },
                    },
                    {
                      target: "labels",
                      mutation: (props) => {
                        return {
                          text: props.datum.x + "\n" + props.datum.y + "%",
                          style: {
                            fill: fillGraph,
                            fontSize: "14",
                            fontWeight: "bold",
                            padding: "1rem",
                          },
                        };
                      },
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: "data",
                      mutation: ({ style }) => {
                        return null;
                      },
                    },
                    {
                      target: "labels",
                      mutation: ({ text }) => {
                        return null;
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 12, fill: fillGraph }}
          colorScale={graphColor}
          x={200}
          y={200}
          text={
            showValue ? totalValue.toFixed(2).toString() + " USD" : "********" + " USD"
          }
          events={{
            onClick: () => [
              {
                target: "data",
                mutation: (props) => {
                  return props.text === "clicked" ? null : { text: "clicked" };
                },
              },
            ],
          }}
        />
      </svg>
    </div>
  );
};

export default Graphic;
