function randomItem(arr) { 
    return arr[Math.floor(Math.random() * arr.length)];
}

const operators = [ 
    "Mr. James Mitchell","Mr. Liam Anderson","Mr. Noah Reynolds","Mr. Ethan Collins",
    "Mr. Mason Carter","Mr. Oliver Bennett","Mr. Alexander Brooks","Mr. Daniel Parker",
    "Mr. Henry Sullivan","Ms. Emma Roberts","Ms. Ava Thompson","Ms. Mia Henderson",
    "Ms. Charlotte  Gray"
];

const models = ["MD-100","MD-200","MD-300","MD-400"];
const lots = ["1","2","3","4"];

const machineNames = {
    1: "machine 1", 2: "machine 2", 3: "machine 3", 4: "machine 4", 5: "machine 5",
    6: "machine 6", 7: "machine 7", 8: "machine 8", 9: "machine 9", 10: "machine 10", 
    11: "machine 11", 12: "machine 12", 13: "machine 13", 14: "machine 14", 15: "machine 15"
};

let tableData = [];
let id = 1;

for(let m=1; m<=4; m++){  
    for(let i=0; i<20; i++){
        tableData.push({
            id: id++,
            date: "2024-02-" + String((i % 28) + 1).padStart(2,'0'),
            time: (8+i)%24 + ":00",
            machine: machineNames[m],
            operator: randomItem(operators),
            model: randomItem(models),
            lot: randomItem(lots),
        });
    }
}

var table = new Tabulator("#machineTable", {
    data: tableData,
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 20,
    paginationSizeSelector: [10,20,40,80],
    placeholder: "Not Found",

    columns: [
        { title: "Date", field: "date", sorter:"string" },
        { title: "Time", field: "time" },
        { title: "Machine", field: "machine"},
        { title: "Operator", field: "operator"},
        { title: "Model Part", field: "model"},
        { title: "Lot Number", field: "lot" },
    ],
});


////////////// FILTER VARIABLES //////////////

let selectedMachine = "";
let selectedOperator = "";
let selectedModel = "";
let selectedLot = "";
let searchValue = "";



function updateFilters(){

    let filters = [];

    if(searchValue !== ""){
        filters.push([
            {field:"date", type:"like", value: searchValue},
            {field:"operator", type:"like", value: searchValue},
            {field:"model", type:"like", value: searchValue},
            {field:"lot", type:"like", value: searchValue}
        ]);
    }

    // MACHINE FILTER
    if(selectedMachine !== ""){
        filters.push({field:"machine", type:"=", value:selectedMachine});
    }

    // OPERATOR FILTER
    if(selectedOperator !== ""){
        filters.push({field:"operator", type:"=", value:selectedOperator});
    }

    // MODEL FILTER
    if(selectedModel !== ""){
        filters.push({field:"model", type:"=", value:selectedModel});
    }

     // LOT FILTER
    if(selectedLot !== ""){
        filters.push({field:"lot", type:"=", value:selectedLot});
    }

    table.setFilter(filters);
}



document.getElementById("search").addEventListener("keyup", function () {
    searchValue = this.value;
    updateFilters();
});

////////////// MACHINE FILTER //////////////
document.getElementById("machineFilter").addEventListener("change", function () {
    selectedMachine = this.value;
    updateFilters();
});

////////////// LOT FILTER //////////////
document.getElementById("lotFilter").addEventListener("change", function () {
    selectedLot = this.value;
    updateFilters();
});


////////////// OPERATOR FILTER //////////////
document.getElementById("operatorFilter").addEventListener("change", function () {
    selectedOperator = this.value;
    updateFilters();
});


//////////////// MODEL FILTER //////////////
document.getElementById("modelsFilter").addEventListener("change", function () {
    selectedModel = this.value;   
    updateFilters();
});



////////////// RESET FILTER BUTTON //////////////

document.getElementById("resetFilterBtn").addEventListener("click", function () {

    selectedMachine = "";
    selectedLot = "";
    selectedOperator = "";
    selectedModel = "";
    searchValue = "";

    document.getElementById("search").value = "";
    document.getElementById("machineFilter").value = "";
    document.getElementById("operatorFilter").value = "";
    document.getElementById("lotFilter").value = "";
    document.getElementById("modelsFilter").value = "";

    table.clearFilter(true);
});
