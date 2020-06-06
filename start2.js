function Item(name, price) {
    this.name = name;
    this.price = price;
  }

let arrStorage = [
    [new Item("Яблоки",80),     10, 0],
    [new Item("Апельсины", 65), 50, 0],
    [new Item("Груши", 150),    20, 0],
    [new Item("Помидоры", 100), 25, 0],
    [new Item("Огурцы", 50),    16, 0]
  ];

let arrBasket = [];

let table1 = document.getElementById("HTMLtable1");
let table2 = document.getElementById("HTMLtable2");
let summIndicator = document.getElementById("totalPrice");

updateTable(table1, arrStorage);

function updateTable(table, array){
    while(table.rows.length > 1) table.deleteRow(1);   
    let j = ((array == arrStorage) ? 1:2);
    for (let i = 0; i<array.length; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${array[i][0].name}</td><td>${array[i][j]}</td><td>${array[i][0].price}</td>
        <input value="+" onclick="add('${array[i][0].name}')" type="button">
        <input value="-" onclick="del('${array[i][0].name}')" type="button">`;
        table.append(tr);
    }
}

function add(nameOfItem){
    commonCode(nameOfItem, arrStorage, arrBasket, 2, 1);
}

function del(nameOfItem){
    commonCode(nameOfItem, arrBasket, arrStorage, 1, 2);
}

function commonCode(nameOfItem, array2, array1, j, k){
    let index = array2.findIndex(
        (element, index, array) => {return element[0].name == nameOfItem});
    if (index > -1 && array2[index][k] >= 0){
        if (array2[index][j] == 0){
            array1.push(array2[index]); 
        }
        array2[index][j]++;       
        array2[index][k]--;
    
        if (array2[index][k] == 0){
            array2.splice(index,1);
        }
        updateTable(table1,arrStorage);
        updateTable(table2,arrBasket);
        updateSumm();
    }
}

function updateSumm(){
	let summ = 0;	
	for (let i = 0; i<arrBasket.length; i++){
		summ += arrBasket[i][2] * arrBasket[i][0].price;	
	}
	summIndicator.innerHTML = `<h3>${summ}</h3>`;
}