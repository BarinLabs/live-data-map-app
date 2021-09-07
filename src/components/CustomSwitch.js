import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const CustomSwitch = withStyles({
  switchBase: {
    "&$checked": {
      color: "#16123F",
    },
    "&$checked + $track": {
      backgroundColor: "#000000",
      opacity: 0.38,
    },
  },
  checked: {},
  track: {},
})(Switch);

export default CustomSwitch;
