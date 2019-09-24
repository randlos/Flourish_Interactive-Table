import data from "../data";
import * as transform from "./values";

function maxValue(column) {
    let exp_column = column;
    let scope_data = data.Data;
    //console.log(scope_data);

    let dataArray = new Array();

    scope_data.forEach(function(item, index, array) {

        // GET THE LAST ITEM (LAST COLUMN CELL) IN A ARRAY
        //console.log(item.values.slice(-1)[0], index);

        // Get the active column for bar-charts in Characters, convert it to a number and get the max value of that column

        //console.log("Bar Column: " + exp_column);

        let valueToConsider = transform.getjustnumber(item.values.slice(exp_column)[0]);
        dataArray.push(valueToConsider);
        //console.log(valueToConsider)

    });


    let maxVal = Math.max.apply(Math, dataArray);
    //console.log("DataArray: " + dataArray);
    // console.log("InFunction maxValue: " + maxVal);
    return maxVal;
}


function minValue(column) {

    let exp_column = column;
    let scope_data = data.Data;

    let dataArray = new Array();

    scope_data.forEach(function(item, index, array) {

        // GET THE LAST ITEM (LAST COLUMN CELL) IN A ARRAY
        //console.log(item.values.slice(-1)[0], index);

        // Get the active column for bar-charts in Characters, convert it to a number and get the max value of that column

        //console.log("Bar Column: " + exp_column);

        let valueToConsider = transform.getjustnumber(item.values.slice(exp_column)[0]);
        dataArray.push(valueToConsider);
        //console.log(valueToConsider)

    });


    let minVal = Math.min.apply(Math, dataArray);
    //console.log("DataArray: " + dataArray);

    return minVal;
}


export { maxValue, minValue };