function createEmployeeRecord(employee){
    let employeeRecord = {}
    employeeRecord.firstName = employee[0]
    employeeRecord.familyName = employee[1]
    employeeRecord.title = employee[2]
    employeeRecord.payPerHour = employee[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord

}


function createEmployeeRecords(employees){
    const employeeRecord = []
    for(let employee of employees){
        let newEmployee = createEmployeeRecord(employee)
        employeeRecord.push(newEmployee)

    }
    return employeeRecord
}

function createTimeInEvent(employee, dateTimeIn){
    let timeIn = {
        type: 'TimeIn',
        hour: parseInt(dateTimeIn.split(' ')[1], 10),
        date: dateTimeIn.split(' ')[0]
    }
    employee.timeInEvents.push(timeIn)
    console.log(employee)
    return employee
}

function createTimeOutEvent(employee, dateTimeIn){
    let timeOut = {
        type: 'TimeOut',
        hour: parseInt(dateTimeIn.split(' ')[1], 10),
        date: dateTimeIn.split(' ')[0]
    }
    employee.timeOutEvents.push(timeOut)
    console.log(employee)
    return employee
}

function hoursWorkedOnDate(employee, date){
    for(let timeIn of employee.timeInEvents){
        if(timeIn.date === date){
            let inHour = timeIn.hour
            if(inHour){
                let outHour = findMatchingTimeOutEvent(employee, date)
            if(outHour){
                return (outHour - inHour)/100
            }
            }
        }
        
    }
}

function findMatchingTimeOutEvent(employee, date){
    for(let timeOut of employee.timeOutEvents){
        if(timeOut.date === date){
            return timeOut.hour
        }
    }
    return false
}

function wagesEarnedOnDate(employee, date){
    let hours = hoursWorkedOnDate(employee, date)
    if(hours){
        return hours * employee.payPerHour
    }
}

function allWagesFor(employee){
    let totalWage = 0
    for(let timeIn of employee.timeInEvents){
        let hours = findMatchingTimeOutEvent(employee, timeIn.date)
        if(hours){
            let dayWage = wagesEarnedOnDate(employee, timeIn.date)
            totalWage += dayWage
        }
    }
    return totalWage
}

function calculatePayroll(employees){
    let totalPayroll = 0
    employees.forEach(employee => {
        let employeeWages = allWagesFor(employee)
        totalPayroll += employeeWages
    });
    return totalPayroll

}