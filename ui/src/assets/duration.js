export const duration = (startDate, stopDate) => {
  const milliseconds = stopDate.getTime() - startDate.getTime();

  const day = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (milliseconds - day * (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const min = Math.floor(
    (milliseconds - day * (24 * 60 * 60 * 1000) - hours * (60 * 60 * 1000)) /
      60000
  );

  const sec = Math.ceil((milliseconds / 1000) % 60);

  return `${day > 0 ? day.toString().padStart(2, '0') + ' day -' : ''} ${
    hours > 0 ? hours.toString().padStart(2, '0') + ' hours -' : ''
  } 
   ${min > 0 ? min.toString().padStart(2, '0') + ' minutes - ' : ''} 
    ${sec > 0 ? sec.toString().padStart(2, '0') + ' secondes' : ''}`;
};
