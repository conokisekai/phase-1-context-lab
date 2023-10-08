function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  this.timeInEvents.push({
    type: 'TimeIn',
    date: date,
    hour: parseInt(hour, 10),
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  this.timeOutEvents.push({
    type: 'TimeOut',
    date: date,
    hour: parseInt(hour, 10),
  });
  return this;
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((event) => event.date === date).hour;
  const timeOut = this.timeOutEvents.find((event) => event.date === date).hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((record) => record.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(
    (total, record) => total + allWagesFor.call(record),
    0
  );
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  );

  return payable;
};
