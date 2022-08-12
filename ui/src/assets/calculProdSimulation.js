export const calculProdByElpatedTime = (
  currentGoal,
  nbAfter,
  day,
  hrs,
  min,
  sec
) => {
  let prod = 0;

  const totalTime =
    parseInt(day) * 86400 + parseInt(hrs) * 3600 + parseInt(min) * 60 + sec;

  if (
    parseFloat(currentGoal) > 0 &&
    parseInt(nbAfter) > 0 &&
    !isNaN(totalTime)
  ) {
    const prodGoal = 3600 / parseFloat(currentGoal);
    const currentProd = totalTime / parseInt(nbAfter);
    prod = Math.round((prodGoal / currentProd) * 100);

    console.log(parseFloat(currentGoal), parseInt(nbAfter), prod, totalTime);
  }
  if (prod === Infinity) {
    prod = 0;
  }
  if (prod > 100) {
    prod = 100;
  }

  return prod;
};
