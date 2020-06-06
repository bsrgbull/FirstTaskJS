function Item(name, price) {	//Конструктор для создания объектов товара
    this.name = name;
    this.price = price;
  }

let arrStorage = [				//Массив с товарами на Складе
    [new Item("Яблоки",80),     10, 0],		//Вторая колонка - это количество на Складе
    [new Item("Апельсины", 65), 50, 0],		//Третяя - количество в Корзине
    [new Item("Груши", 150),    20, 0],
    [new Item("Помидоры", 100), 25, 0],
    [new Item("Огурцы", 50),    16, 0]
  ];

let arrBasket = [];		//Товары в Корзине

let table1 = document.getElementById("HTMLtable1");
let table2 = document.getElementById("HTMLtable2");
let summIndicator = document.getElementById("totalPrice");

updateTable(table1, arrStorage);	//Первичное заполнение Склада товарами

function updateTable(table, array) {			//Обновляет Склад или Корзину,
    while(table.rows.length > 1) table.deleteRow(1);    //для этого полностью стирает все
    let j = ( (array == arrStorage) ? 1:2);		//строки в таблице, затем заполняет
    for (let i = 0; i < array.length; i++) {		//их товарами из массивов
        let tr = document.createElement('tr');		//На вход получает таблицу и соответствующий массив
        tr.innerHTML = 
	`<td>${array[i][0].name}</td><td>${array[i][j]}</td><td>${array[i][0].price}</td>
        <input value="+" onclick="add('${array[i][0].name}')" type="button">
        <input value="-" onclick="del('${array[i][0].name}')" type="button">`;
        table.append(tr);
    }
}

function add(nameOfItem) {
    commonCode(nameOfItem, arrStorage, arrBasket, 2, 1);
}

function del(nameOfItem) {
    commonCode(nameOfItem, arrBasket, arrStorage, 1, 2);
}

function commonCode(nameOfItem, array2, array1, j, k) {
    let index = array2.findIndex(
        (element, index, array) => {return element[0].name == nameOfItem});
    if (index > -1 && array2[index][k] >= 0) {
        if (array2[index][j] == 0) {		   //Чтобы удалить/добавить товар в Корзину/из Корзины
            array1.push(array2[index]); 	   //требуется одинаковый код, но разные массивы и их столбцы
        }					   //Получает на вход Название товара, массивы для удаления и
        array2[index][j]++;       		   //для добавления товара, номера столбцов в массивах
        array2[index][k]--;
    
        if (array2[index][k] == 0) {
            array2.splice(index,1);
        }
        updateTable(table1,arrStorage);
        updateTable(table2,arrBasket);
        updateSumm();
    }
}

function updateSumm() {		//Обновляет сумму
	let summ = 0;	
	for (let i = 0; i < arrBasket.length; i++) {
		summ += arrBasket[i][2] * arrBasket[i][0].price;	
	}
	summIndicator.innerHTML = `<h3>${summ}</h3>`;
}
