const calculateIncidenceRate = require("./calculateIncidenceRate");

// expected as a result {department: incidence} : [ { '1': '1.37' }, { '2': '2.76' }, { '3': '0.60' } ]
module.exports = function (dataCovid19) {
  // get all the departments number
  let findDepartmentsNumbers = [...new Set(dataCovid19.map((doc) => doc.dep))];

  let result = findDepartmentsNumbers.map((num) => {
    let i = 0;
    let sortedDep = dataCovid19.filter((doc) => {
      if (doc.dep === num) {
        return doc;
      }
    });
    let obj = {
      [`${num}`]: calculateIncidenceRate(sortedDep),
    };
    return obj;
  });
  return result;
};
