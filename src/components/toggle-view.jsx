import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

export default function SwitchLabels({ viewTable, setViewTable }) {
  const handleChange = () => {
    setViewTable(!viewTable);
  };

  return (
    <Grid container direction='row' justify='flex-end' alignItems='center'>
      <FormControlLabel
        control={
          <Switch
            checked={viewTable}
            onChange={handleChange}
            name='table'
            color='primary'
          />
        }
        label='Show Table View'
      />
    </Grid>
  );
}
