import React from 'react';
import createPersistedState from 'use-persisted-state';
import { isEmpty, pipe, not } from 'ramda';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import TextField from './components/textfield';
import KeyWordsGenerated from './components/keywords-generated';
import ToggleGenerated from './components/toggle-view.jsx';

const useKeywordState = createPersistedState('keyword');
const useViewTableState = createPersistedState('viewTable');

const hasKeywords = pipe(isEmpty, not);

function App() {
  const [keywords, setKeywords] = useKeywordState([]);
  const [viewTable, setViewTable] = useViewTableState(false);

  return (
    <Grid container direction='column' justify='center'>
      <Typography variant='h2' component='h2' gutterBottom align='center'>
        Keyword Match Generator
      </Typography>
      <ToggleGenerated viewTable={viewTable} setViewTable={setViewTable} />

      <TextField setKeywords={setKeywords} />
      {hasKeywords(keywords) && (
        <KeyWordsGenerated data={keywords} viewTable={viewTable} />
      )}
    </Grid>
  );
}

export default App;
