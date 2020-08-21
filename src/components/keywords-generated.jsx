import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    width: '100%',
    lineHeight: 1.5,
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    '& textarea': {
      width: '100%',
      cursor: 'pointer',
      textAlign: 'center',
      backgroundColor: '#fff',
      fontSize: '1.4em',
      transition: 'all 0.3s',
    },
    '& textarea:hover': {
      border: '1px solid black',
      backgroundColor: '#fafafa',
    },
  },
}));

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const KeyWordsGeneratedTable = ({ data, setOpen }) => {
  return (
    <MaterialTable
      options={{
        search: false,
        paging: false,
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF',
          fontSize: '1.5em',
          textAlign: 'center',
        },
      }}
      columns={[
        {
          title: 'Search Term',
          field: 'term',
          cellStyle: {
            fontSize: '1.5em',
            textAlign: 'center',
          },
        },
        {
          title: 'Generated Term',
          field: 'generated',
          render: ({ generated }) => (
            <BootstrapButton
              defaultValue={generated}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(generated);
                setOpen(true);
              }}
            >
              {generated}
            </BootstrapButton>
          ),
        },
      ]}
      data={data || []}
      title='Keywords Generated'
    />
  );
};

const SingleViewGenerated = ({ data, setOpen }) => {
  const classes = useStyles();

  const value = data.reduce((acc, line) => {
    return `${acc}
${line.generated}
`;
  }, ``);

  const handleOnClick = (event) => {
    navigator.clipboard.writeText(event.target.value);
    setOpen(true);
  };
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <TextareaAutosize
        id='standard-multiline-flexible'
        label='Multiline'
        multiline
        rowsMin={3}
        value={value.trim()}
        onClick={handleOnClick}
      />
    </Grid>
  );
};

const KeyWordsGenerated = ({ data, viewTable }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Typography variant='h5' component='h5' gutterBottom align='center'>
        Click on the text to copy it to clipboard.
      </Typography>
      {viewTable && <KeyWordsGeneratedTable data={data} setOpen={setOpen} />}
      {!viewTable && <SingleViewGenerated data={data} setOpen={setOpen} />}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          Text copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default KeyWordsGenerated;
