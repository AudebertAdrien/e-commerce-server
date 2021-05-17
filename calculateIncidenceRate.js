module.exports = function (depData) {
  let sumOfPopulation = 0;
  let sumOfPositiveCase = 0;
  for (let i = 0; i < depData.length; i++) {
    sumOfPositiveCase += depData[i].P;
    sumOfPopulation += depData[i].pop;
  }
  function roundedToTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
  return roundedToTwo((sumOfPositiveCase * 100000) / sumOfPopulation);
};
