import React from 'react';
import createPersistedState from 'use-persisted-state';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import KeyboardHideIcon from '@material-ui/icons/KeyboardHide';
import Grid from '@material-ui/core/Grid';
import { isEmpty, pipe, not } from 'ramda';

const isNotEmpty = pipe(isEmpty, not);
const useTextState = createPersistedState('text');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    marginBottom: '40px',
  },
}));

const generateKeywords = (text, setKeywords) => {
  const data = text
    .split(/\r?\n/)
    .filter(isNotEmpty)
    .map((line) => {
      const generated = `+${line.split(' ').join(' +')}
"${line}"
[${line}]`;
      return {
        term: line,
        generated,
      };
    });
  setKeywords(data);
};

export default function MultilineTextFields(props) {
  const classes = useStyles();
  const [textField, setTextFieldValue] = useTextState('');

  const handleChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  const handleSubmit = () => generateKeywords(textField, props.setKeywords);

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Grid container direction='column' justify='center' alignItems='center'>
        <TextField
          id='outlined-multiline-static'
          label='Keyword Generator'
          multiline
          rows={10}
          placeholder='Write a sentence'
          variant='outlined'
          onChange={handleChange}
          value={textField}
        />
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.button}
          onClick={handleSubmit}
          startIcon={<KeyboardHideIcon />}
        >
          Generate
        </Button>
      </Grid>
    </form>
  );
}
