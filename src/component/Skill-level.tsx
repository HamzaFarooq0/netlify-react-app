import React from "react";

//Material-UI
import makeStles, { makeStyles } from '@material-ui/core';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles({
    form: {
        display: 'flex',
        displayDirection: 'column',
        margin: '50px',
    },
    lable: {
        fontSize: '2.8rem',
        padding: '30px'
    }
})

export const Level: React.FC = () => {
    const classes = useStyles()
  const [level, setLevel] = React.useState("easy");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel((event.target as HTMLInputElement).value);
  };
  return (
    <React.Fragment>
    <FormControl className={classes.form} component="fieldset">
      <FormLabel className={classes.lable} component="legend">Skill Level</FormLabel>
      <RadioGroup
        aria-label="skill-level"
        name="level"
        value={level}
        onChange={handleChange}
      >
        <FormControlLabel value="easy" control={<Radio />} label="Easy" />
        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
        <FormControlLabel value="hard" control={<Radio />} label="Hard" />
      </RadioGroup>
    </FormControl>
  </React.Fragment>
  )
}
