import React from 'react';
import { FixedSizeList } from 'react-window';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import {
  ListItem, ListItemButton, ListItemText, Stack, TextField,
} from '@mui/material';
import { DateTime, Duration } from 'luxon';
import { timeZonesNames } from '@vvo/tzdb';

function TimestampPicker(p: { time: DateTime, setTime: React.Dispatch<React.SetStateAction<DateTime>>,
  setTimezone: React.Dispatch<React.SetStateAction<string>> }) {
  const { time, setTime, setTimezone } = p;

  function timezoneRows(props: { index: number; style: React.CSSProperties; }) {
    const { index, style } = props;

    return (
      <ListItem
        style={style}
        key={timeZonesNames[index]}
        component="div"
        onClick={() => setTimezone(timeZonesNames[index])}
      >
        <ListItemButton>
          <ListItemText primary={timeZonesNames[index]} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Stack className="times" direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DateTimePicker
          ampm={false}
          renderInput={(props) => <TextField {...props} />}
          label="Local DateTime"
          value={time}
          onChange={(newTime) => { if (newTime !== null) setTime(newTime); }}
          openTo="day"
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          inputFormat="yyyy-MM-dd HH:mm:ss"
        />
      </LocalizationProvider>
      <TextField
        id="outlined-helperText"
        label="Milliseconds"
        defaultValue={time.millisecond}
        onChange={(e) => {
          const milliSecs = e.target.value;
          const newMilli = !Number.isNaN(milliSecs) && milliSecs.length > 0 && milliSecs.length < 4
            ? parseInt(milliSecs, 10)
            : 0;
          setTime(time.plus(Duration.fromMillis(newMilli - time.millisecond)));
        }}
      />
      <FixedSizeList
        height={200}
        width={350}
        itemSize={45}
        itemCount={timeZonesNames.length}
      >
        {timezoneRows}
      </FixedSizeList>
    </Stack>
  );
}

export default TimestampPicker;
