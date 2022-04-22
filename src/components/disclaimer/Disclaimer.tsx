import {Warning, Lightbulb, Check} from "@mui/icons-material";


export default (props:
  {
    heading: string,
    message: string,
    type: "warning" | "info" | "check" | "caution"
  }) => {


  const {heading, message, type} = props;

  const iconStyle: React.CSSProperties = {
    width: "100%"
  };

  let icon: JSX.Element;
  let color: string;
  switch (type)
  {
    case "caution":
      icon = <Warning fontSize="large"/>;
      color = "#f9c199"
      break;
    case "info":
      icon = <Lightbulb fontSize="large"/>
      color = "#acb1f2";
      break;
    case "warning":
      icon = <Warning fontSize="large"/>;
      color = "#ff8689";
      break;
    case "check":
      icon = <Check fontSize="large"/>
      color = "#aefba8";
  }

  let style: React.CSSProperties={
    display: "grid",
    gridTemplateColumns: "30% 70%",
    backgroundColor: color,
    width: "70%",
    margin: "auto",
    padding: "10px",
    alignContent: "center",
    alignItems: "center",
    "justifyContent": "center",
    "justifyItems": "center",
    borderRadius: "10px",
    minWidth: "280px",
    marginTop: "15px",
  }


  return (
    <div className="disclaimer" style={style}>
      {icon}
      <div>
        <h3>{heading}</h3>
        <p>{message}</p>
      </div>

    </div>
  );
}
