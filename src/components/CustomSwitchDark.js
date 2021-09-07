import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const CustomSwitchDark = withStyles({
  switchBase: {
    "&$checked": {
      color: "#4FC4CA",
    },
    "&$checked + $track": {
      backgroundColor: "#000000",
      opacity: 0.38,
    },
  },
  checked: {},
  track: {},
})(Switch);

export default CustomSwitchDark;
