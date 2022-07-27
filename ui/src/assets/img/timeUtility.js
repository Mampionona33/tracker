export const dateToString = (dt) => {
  /* 
    format the iso date to YYYY-MM-DD
    */
  const newDate = new Date(dt);
  return `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
};

export const dateTime = (date1) => {
  /* 
    format iso date as HH:MM:SS
    */
  const date = new Date(date1);
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

export const difDate = (date1, date2) => {
  /*
      calcul difference between to date
   */
  const dt1 = new Date(date1).getTime();
  const dt2 = new Date(date2).getTime();
  return Math.floor((dt2 - dt1) / 1000);
};

export const secondToDayHourMinSec = (secondes) => {
  // day
  let day = Math.floor(secondes / (24 * 3600));
  secondes -= day * 24 * 3600;

  //   hours
  let hours = Math.floor(secondes / 3600);
  secondes -= hours * 3600;

  //   minutes
  let minutes = Math.floor(secondes / 60);
  secondes -= minutes * 60;

  return { day, hours, minutes, secondes };
};
