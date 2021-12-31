import React from 'react';
import {
  Card, CardContent, Stack, Typography,
} from '@mui/material';
import { DateTime } from 'luxon';

function TimestampView(p: { time: DateTime }) {
  const { time } = p;
  return (
    <Stack className="times" direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Local DateTime
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {time.toISO()}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            UTC
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {time.toUTC().toISO()}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default TimestampView;
