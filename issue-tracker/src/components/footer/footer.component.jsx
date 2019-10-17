import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import './footer.styles.css';

const Footer = ({ props }) => {;

    return (
      <footer className="Footer">
        <FormControlLabel
            value="start"
            control={<Switch color="primary" />}
            label="Nightmode"
            labelPlacement="start"
          />
      </footer>
    );
};
  
  export default Footer;