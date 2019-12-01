import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import './footer.styles.css';

const Footer = props => {
  if (props.mobileDevice) {
    return (
      null
    );
  } else {
    return (
      <footer className={"Footer".concat(props.darkMode ? " FooterDarkMode" : " FooterLightMode")}>
        <FormControlLabel
          value="start"
          control={<Switch
            color="primary"
            checked={props.checked || false}
            onChange={props.onChange}
          />}
          label="Nightmode"
          labelPlacement="start"
        />
      </footer>
    );
  }
};

export default Footer;