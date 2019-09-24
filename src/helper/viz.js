import state from "../state";
import * as transform from "../helper/values";
import * as stats from "../helper/stats";

//import * as viz from "./helper/viz";

// Show Clean Data without viz

function without_viz(data, type, row, meta) {
    if (type == "display") {
        return transform.number_format(data);
    }
    return transform.getjustnumber(data);
}


// Show image in column

function show_img(data, type, row, meta) {
    if (data.indexOf("https://") > -1) {
        var img_tag = '<img src="' + data + '"height="' + state.imgsize_h + '"width="' + state.imgsize_w + '">';
        //console.log("height: " + state.imgsize[0] + ", width: " + state.imgsize[1]);
        return img_tag;
    } else {
        return data;
    }
}

// Barcharts

function barchart(data, type, row, meta) {
    //console.log(state.bar_column);
    //console.log(transform.tranlsateSortingAlphaToNumber(state.bar_column));
    let maxVal = stats.maxValue(meta.col);
    let minVal = stats.minValue(meta.col);
    //console.log("MinValue: " + minVal);
    let rangeMax = maxVal - minVal;
    //console.log("rangeMax: " + rangeMax);

    // Adjust the max to 100% and distribute to min
    let maxNormalize = (Math.abs(transform.getjustnumber(data)) / maxVal) * 100;
    // ((data - minVal+1)/rangeMax) * 100 --> Get the difference between the actual data-value and the range to map the data from minValue = 1 (+1) to maxValue = 100 (+1)
    let minMaxNormalize_plus = ((Math.abs(transform.getjustnumber(data)) - minVal) / rangeMax) * 90;
    let minMaxNoralize_minus = ((Math.abs(transform.getjustnumber(data)) - minVal) / rangeMax) * 53;

    if (type == "display") {
        if (state.bar_switch) { //
            if (isNaN(transform.getjustnumber(data))) {
                //console.log("data is not a number");
                return String(data);

            } else if (state.negative_bar) {
                let pre_bar_container = '<div class="barcont">';

                let lefttd_start = '<div class="leftbar">';
                let lefttd_end = '</div>';
                let righttd_start = '<div class="rightbar">';
                let righttd_end = '</div>';



                let left_content = '<p style="text-align:right;margin:0 4px 0 0;">' + transform.number_format(data) + '</p>';
                let right_content = '<p style="text-align:left;margin:0 0 0 4px;">' + transform.number_format(data) + '</p>';

                // 

                let right_bar = '<div class="bardiv"> <span class="bar" style="height:19px;width:' + minMaxNoralize_minus + '%; background: ' + state.color_balken_positive + '"></span></div>';
                let left_bar = '<div class="bardiv"> <span class="bar" style="float:right;height:20px;width:' + minMaxNoralize_minus + '%; background:' + state.color_balken_negative + '"></span></div>';

                let post_bar_container = '</div>';


                let zerovalue = pre_bar_container + '<p style="text-align: center; margin:0;">' + data + '</p>' + post_bar_container;
                let positive = pre_bar_container + lefttd_start + left_content + lefttd_end + righttd_start + right_bar + righttd_end + post_bar_container;
                let negative = pre_bar_container + lefttd_start + left_bar + lefttd_end + righttd_start + right_content + righttd_end + post_bar_container;

                if (transform.getjustnumber(data) < 0) {
                    //console.log(Math.abs(getjustnumber(data)));  
                    return negative;
                } else if (transform.getjustnumber(data) == 0) {
                    return zerovalue;
                } else {
                    return positive
                }


            } else {
                let pre_bar_container = '<div class="barcont">';
                let bartext = '<div class="bartext"><p style="color:#000000">' + data + '</p></div>';
                // if (transform.getjustnumber(data) < 0) {
                //     let bar = '<div class="bardiv"> <span class="bar" style="height:20px;width:' + rangeMax + '%;background: #DD0000"></span></div>';
                // }
                //console.log("Test minMaxNormalize" + minMaxNormalize);

                // BARCHART WITH DIV
                let bar = '<div class="bardiv"> <span class="bar" style="lheight:20px;width:' + minMaxNormalize_plus + '%; background:' + state.color_balken_positive + '"></span></div>';
                // viz.colorMapBalken(data, minVal, maxVal)  / console.log(maxNormalize);
                let post_bar_container = '</div>';

                return pre_bar_container + bar + bartext + post_bar_container;
            }
        } else {
            return transform.number_format(data);
        }
    }

    return transform.getjustnumber(data);


}

// Viz helper
function without_bar(number, data) {
    let value_array = data.Data[0].values;
    let key_array = new Array();
    let column_array = new Array();

    for (let index in value_array) {
        key_array.push(parseInt(index))
    }

    if (typeof number == 'number') {
        number = [number];
        // console.log(typeof number);
    }

    // console.log("Number: " + number);
    // console.log("Value_array: " + value_array.keys());
    // console.log("Keys Array: " + key_array);

    column_array = key_array.filter(val => !number.includes(val))
        //console.log(column_array);
    return column_array;
}


function colorMapBalken(data, minVal, maxVal) {

    let color = d3.scaleLinear()
        .domain([minVal, maxVal])
        .interpolate(d3.interpolateHsl)
        .range(["white", "#D82217"]);

    return color(data);

}


let colortestdata = [2, 4, 7, 8, 14, 55, 66, 99];
// console.log(colortestdata.length);
// console.log(colorMapBalken(colortestdata));


export { without_viz, show_img, barchart, without_bar, colorMapBalken };