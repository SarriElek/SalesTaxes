var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

function calculateSalesTax(salesData, taxRates) {
  // Implement your code here
  // Initialize the resulting object, sales taxes for each company
  var salesTaxes = {};
  salesData.forEach(function(companySales){
    // Take the name of the current company
    var companyName = companySales.name;
    var companySalesTaxes;
    // See if we have a sales tax object for the company
    if(!salesTaxes[companyName]){
      //If the company has no result yet, create the sales tax object
      companySalesTaxes = {};
      companySalesTaxes["totalSales"] = 0;
      companySalesTaxes["totalTaxes"] = 0;
      salesTaxes[companyName] = companySalesTaxes;
    }
    //Calculate the sales for the province
    companySalesTaxes = salesTaxes[companyName];
    var salesPerProvince = sumSalesInProvince(companySales);
    companySalesTaxes.totalSales += salesPerProvince;
    //Calculate taxes for the province and add to the total taxes
    var provinceTaxes = salesTaxRates[companySales.province];
    companySalesTaxes.totalTaxes += sumTaxesInProvince(salesPerProvince, provinceTaxes);
 });
  return salesTaxes;
}

function sumSalesInProvince(companySales){
  var totalSalesPerProvince = 0;
  var salesPerProvince = companySales.sales;
  salesPerProvince.forEach(function(sale){
    totalSalesPerProvince += sale;
  });
  return totalSalesPerProvince;
}

function sumTaxesInProvince(salesPerProvince, provinceTaxes){
  return salesPerProvince * provinceTaxes;
}

var results = calculateSalesTax(companySalesData, salesTaxRates);
console.log(results);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/
