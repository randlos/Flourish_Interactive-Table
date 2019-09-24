function number_format(data) {

    // if (typeof data == 'string') {
    //     console.log("data is string: " + data);
    //     return String(data);
    // } else


    // convert data to string for format manipulation
    if (typeof data != "string") {
        data = String(data);
    }

    // exchange . for , to display data in the german way
    if (data.includes(".")) {
        data = data.replace(".", ",");
    }

    if (Math.abs(data) >= 10000 && Math.abs(data) <= 1000000) {
        //console.log(thousand(data));
        return thousand(data);
    } else if (Math.abs(data) >= 1000000) {
        return mio(data);
    } else if (data < 0) {
        let minus = data.substring(0, 1);
        let hundreds = data.substring(1, );
        return minus + " " + hundreds;
    } else {
        return data;
    }

    function thousand(data) {
        if (data < 0 && Math.abs(data) < 100000) {
            let thousand_number = data.substring(1, 3);
            let hundred_number = data.substring(3, 6);
            return "- " + thousand_number + " " + hundred_number;
        } else if (data < 0 && Math.abs(data) > 100000) {
            let thousand_number = data.substring(1, 4);
            let hundred_number = data.substring(4, 7);
            return "- " + thousand_number + " " + hundred_number;
        } else if (data > 0 && Math.abs(data) < 100000) {
            let thousand_number = data.substring(0, 2);
            let hundred_number = data.substring(2, 5);
            return thousand_number + " " + hundred_number;
        } else {
            let thousand_number = data.substring(0, 3);
            let hundred_number = data.substring(3, 6);
            return thousand_number + " " + hundred_number;
        }


    }

    function mio(data) {
        //let mio = data.toString();
        if (data < 0) {
            let mio_number = data.substring(1, 2);
            let thousand_number = data.substring(2, 5);
            let hundred_number = data.substring(5, 8);
            // console.log(mio_number + " " + thousand_number + " " + hundred_number);
            return "- " + mio_number + " " + thousand_number + " " + hundred_number;
        } else {
            let mio_number = data.substring(0, 1);
            let thousand_number = data.substring(1, 4);
            let hundred_number = data.substring(4, 7);
            return mio_number + " " + thousand_number + " " + hundred_number;
        }

    }
}

function tranlsateSortingAlphaToNumber(alpha) {
    //console.log(alpha);

    let barchart_column;
    let columnArray = [];

    let alphaList = [{ number: 1, string: 'A' },
        { number: 2, string: 'B' },
        { number: 3, string: 'C' },
        { number: 4, string: 'D' },
        { number: 5, string: 'E' },
        { number: 6, string: 'F' },
        { number: 7, string: 'G' },
        { number: 8, string: 'H' },
        { number: 9, string: 'I' },
        { number: 10, string: 'J' },
        { number: 11, string: 'K' },
        { number: 12, string: 'L' },
        { number: 13, string: 'M' },
        { number: 14, string: 'N' },
        { number: 15, string: 'O' },
        { number: 16, string: 'P' },
        { number: 17, string: 'Q' },
        { number: 18, string: 'R' },
        { number: 19, string: 'S' },
        { number: 20, string: 'T' },
        { number: 21, string: 'U' },
        { number: 22, string: 'V' },
        { number: 23, string: 'W' },
        { number: 24, string: 'X' },
        { number: 25, string: 'Y' },
        { number: 26, string: 'Z' }
    ];

    if (isNaN(alpha)) {

        if (alpha.length > 1) {
            let state_alpha_list = alpha.split(",");
            let columnlist = [];
            for (let j = 0; j < state_alpha_list.length; j++) {

                for (let i = 0; i < alphaList.length; i++) {
                    //console.log(state_alpha_list[j], alphaList[i].string);

                    if (state_alpha_list[j] == alphaList[i].string) {
                        //console.log("Output:" + alphaList[i].number);
                        columnlist.push(alphaList[i].number - 1);
                    }
                }

            }
            //console.log(columnlist);
            //console.log("Type Array" + typeof(columnlist));
            return columnlist;
        }

        if (typeof alpha == 'object') {
            //console.log("Alpha Array? " + typeof alpha);

            for (let key in alpha) {
                //console.log(alpha[key]);     
                let i;
                for (i = 0; i < alphaList.length; i++) {
                    if (alphaList[i].string == alpha[key]) {
                        //console.log("Output:" + typeof(alphaList[i].number));
                        columnArray.push(alphaList[i].number - 1);
                    };
                }
            }
            //console.log("Column Array: " + "[" + columnArray + "]");
            return columnArray;
        } else {
            let i;
            //console.log("alpha-Input: " + alpha);
            for (i = 0; i < alphaList.length; i++) {
                if (alphaList[i].string == alpha) {
                    //console.log("Output:" + alphaList[i].number);
                    barchart_column = alphaList[i].number - 1;
                    //console.log(barchart_column);
                    return barchart_column;
                };
            };
        }
    } else {
        //console.log(alpha);
        return alpha;
    }

}

function getjustnumber(datavalue) {


    if (datavalue.includes(",")) {
        datavalue = datavalue.replace(",", ".")
    }
    //console.log(datavalue);

    let number = parseFloat(datavalue);

    // Check if datavalue contains only alphabetic-characters to ensure that the search is working for those columns
    if (datavalue == getjuststring(datavalue)) {
        //console.log(datavalue);
        return getjuststring(datavalue);

        if (datavalue == "keine Angabe") {
            return 0;
        }
    }


    return number;
}

function getjuststring(datavalue) {
    var str = datavalue;
    var patt = /[A-Za-z$€].*/g;
    var result = str.match(patt);

    // check if result is an object/match and then return the first object/array entry with result[0]
    if (result) {
        return String(result[0]);
    }
    return result;
}


export { number_format, tranlsateSortingAlphaToNumber, getjustnumber, getjuststring };