import data from "../data";
import * as transform from "./values";

// Get Column-Names

function c_names() {
    let column_data = [];
    for (var i = 0; i < data.Data.column_names.values.length; i++) {
        column_data.push({ "title": data.Data.column_names.values[i] });
    };
    //console.log(column_data);
    return column_data;
}

//Switch Sorting from all to specific columns

function sortingswitch(sortingColumn, sortingOrder) {
    if (sortingColumn == 'keine') {
        return new Array();
    } else {
        let column = transform.tranlsateSortingAlphaToNumber(sortingColumn);
        let output = [column, sortingOrder];
        return output;
    }
}

export { c_names, sortingswitch };