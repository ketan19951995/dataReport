const fs = require('fs')
let data;
try {
    let path = __dirname + '/assignment.json'
    data = fs.readFileSync(path, 'utf8')
    data = JSON.parse(data);
} catch (err) {
    console.error(err)
}

// This function will fetch the total sales 
async function getTotalSales(data) {
    let totalSales = data.reduce(function (sum, sales) {
        return sum + parseInt(sales.Quantity);
    }, 0);

    console.log("totalSales", totalSales);

}
getTotalSales(data);



// This function will fetch the total sales month wise  
async function getMonthWiseTotalSales(data, month, year) {
    let monthSales = data.filter(function (item) {
        return item.Date >= `${year}-${month}-01` && item.Date <= `${year}-${month}-31`
    });

    let totalSales = monthSales.reduce(function (sum, sales) {
        return sum + parseInt(sales.Quantity);
    }, 0);

    console.log(`total Sales for ${month} ${year} is ${totalSales}`);
}
// Get month wise total sales 
getMonthWiseTotalSales(data, "02", "2019");


// This function will fetch the most popular item month wise
async function getMonthWisePopularItem(data, month, year) {
    let monthSales = data.filter(function (item) {
        return item.Date >= `${year}-${month}-01` && item.Date <= `${year}-${month}-31`
    });

    const map1 = new Map();
    for (let i = 0; i < monthSales.length; i++) {
        if (map1.get(monthSales[i].SKU)) {
            let previousQuantity = map1.get(monthSales[i].SKU);
            let currentQuantity = parseInt(monthSales[i].Quantity);
            let totalQuantity = previousQuantity + currentQuantity;
            map1.set(monthSales[i].SKU, totalQuantity);
        } else {
            map1.set(monthSales[i].SKU, parseInt(monthSales[i].Quantity));
        }

    }

    let maxValue = 0;
    for (let [key, value] of map1.entries()) {
        console.log(key, value);
        if (value > maxValue) {
            maxValue = value;
            keyValue = key
        }
    }
    console.log(keyValue, maxValue);
}
// Get month wise total sales 
getMonthWisePopularItem(data, "01", "2019");





// This function will fetch the item generating the most revenue month wise
async function getMaxRevenueMonthWiseByItem(data, month, year) {
    let monthSales = data.filter(function (item) {
        return item.Date >= `${year}-${month}-01` && item.Date <= `${year}-${month}-31`
    });

    const map1 = new Map();
    for (let i = 0; i < monthSales.length; i++) {
        if (map1.get(monthSales[i].SKU)) {
            let previousPrice = map1.get(monthSales[i].SKU);
            let currentPrice = parseInt(monthSales[i].TotalPrice);
            let totalPrice = previousPrice + currentPrice;
            map1.set(monthSales[i].SKU, totalPrice);
        } else {
            map1.set(monthSales[i].SKU, parseInt(monthSales[i].TotalPrice));
        }

    }

    let maxValue = 0;
    for (let [key, value] of map1.entries()) {
        console.log(key, value);
        if (value > maxValue) {
            maxValue = value;
            keyValue = key
        }
    }
    console.log(keyValue, maxValue);
}
// Get month wise total sales 
getMaxRevenueMonthWiseByItem(data, "01", "2019");
