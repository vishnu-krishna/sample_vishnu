let moment = require('moment');

let dateArg = process.argv[2];
let startDate = moment(dateArg);

if (!dateArg || !startDate.isValid()) {
    console.error(`Please enter a valid MomentJS date as the first argument`);
    console.error(`eg:`);
    console.error(`'node monthlyBillingBillDates.js 2018-05-17'`);
    return;
}

let output = [];

for (let count = 1; count <= 31; count ++ ) {

    let entry = {};

    let entryDate = moment(startDate).add(count, 'days');

    entry.dayOfMonth = count;
    entry.billDates = [
        {
            issueDate: entryDate.format('YYYY-MM-DD'),
            dueDate: moment(entryDate).add(11, 'days').format('YYYY-MM-DD'),
        },
        {
            issueDate: moment(entryDate).add(1, 'month').format('YYYY-MM-DD'),
            dueDate: moment(entryDate).add(1, 'month').add(11, 'days').format('YYYY-MM-DD'),
        },
        {
            issueDate: moment(entryDate).add(2, 'month').format('YYYY-MM-DD'),
            dueDate: moment(entryDate).add(2, 'month').add(11, 'days').format('YYYY-MM-DD'),
        }
    ];

    output.push(entry);
}

console.log(JSON.stringify(output));