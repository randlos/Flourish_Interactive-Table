// import update from "./update";
// import state from "./state";


var filter = {
    test: function() {
        console.log("Test");
        return; 
    },// console.log("Filter Function");
    
    metarate: function() {
       // Grundumsatz-Rechner - individueller Kalorienverbrauch
       
       let geschlecht = true; // Man = true, Woman = false
       
       let gewicht_kg = 77.8;
       let groesse_cm= 178;
       let alter_jahre = 39;
       
       let grundumsatz = NaN;

        if (geschlecht == true) {
            grundumsatz = 66.47 + (13,7 * gewicht_kg) + (5 * groesse_cm) - (6.8 * alter_jahre);
        } else {
            grundumsatz = 655.1 + (9.6 * gewicht_kg) + (1.8 * groesse_cm) - (4.7 * alter_jahre);
        }

        // if(geschlecht){
        //     geschlecht = "Männlich"; 
        // } else {
        //     geschlecht = "Weiblich"; 
        // }
       


        // PAL - Fktor - Pysical Activity Level
        var pal = {
            Schlafen: 0.95,
            Liegen: 1.2,
            Sitzen: 1.5,
            SitzenStehen: 1.7,
            Gehen: 1.9,
            Körperlich: 2.4
        };

        //console.log(pal.Sitzen);

       return grundumsatz * pal.Schlafen;
    }
};

export default filter;