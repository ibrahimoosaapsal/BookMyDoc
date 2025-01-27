import moment from 'moment-timezone';

export const getIstGMTTime = (date?:any) => {
  if(date){
    return moment(new Date(date)).tz('Asia/Kolkata').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }else {
    return moment().tz('Asia/Kolkata').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');

  }
  
};

export function DateCalender(inputDate: any) {
  const now = moment(); // Current time
  const past = moment(inputDate); // Input time

  const secondsDiff = now.diff(past, 'seconds');
  const minutesDiff = now.diff(past, 'minutes');
  const hoursDiff = now.diff(past, 'hours');
  const daysDiff = now.diff(past, 'days');
  const weeksDiff = now.diff(past, 'weeks');

  if (secondsDiff < 60) {
    return secondsDiff === 1 ? 'Just now' : `${secondsDiff}s ago`;
  } else if (minutesDiff < 60) {
    return minutesDiff === 1 ? '1m ago' : `${minutesDiff}m ago`;
  } else if (hoursDiff < 24) {
    return hoursDiff === 1 ? '1h ago' : `${hoursDiff}h ago`;
  } else if (daysDiff < 7) {
    return daysDiff === 1 ? '1d ago' : `${daysDiff}d ago`;
  } else if (weeksDiff < 4) {
    return weeksDiff === 1 ? '1w ago' : `${weeksDiff}w ago`;
  } else {
    // Fallback to the default format for dates older than 1 month
    return past.format('MMM D, YYYY');
  }
}

