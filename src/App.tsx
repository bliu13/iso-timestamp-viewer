import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import TimestampPicker from './components/TimestampPicker';
import TimestampView from './components/TimestampView';
import './App.css';

function App() {
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [time, setTime] = useState(DateTime.local().setZone(timezone));

  useEffect(() => {
    setTime(time.setZone(timezone));
  }, [time, timezone]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="h4" component="div">
          Timestamp Input
        </Typography>
        <TimestampPicker time={time} setTime={setTime} setTimezone={setTimezone} />
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" variant="h4" component="div">
          Timestamp Output
        </Typography>
        <TimestampView time={time} />
      </Grid>
    </Grid>
  );
}

export default App;
