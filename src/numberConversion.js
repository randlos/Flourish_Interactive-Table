
export function numconvert(num){
    if (isNaN(num)){
        console.log("Not a Number")
        if (num.indexOf('.') > -1){
            var raw = num;
            var comma = raw.split('.');
            var pointer = comma.join(',');
            //console.log(pointer);
            return pointer
            
        }
        console.log("A Number")
        return num
    }
    else return num
    

}




export function point_to_comma(num){
    if (num.indexOf('.') > -1){
        var raw = num;
        var comma = raw.split('.');
        var pointer = comma.join(',');
        //console.log(pointer);
        return pointer
        
    }
    return num
    }

export function semi_to_comma(num){
    if (num.indexOf(';') > -1){
        var raw = num;
        var comma = raw.split(';');
        var separator = comma.join(',');
        return separator
        
    }
    return num
    }