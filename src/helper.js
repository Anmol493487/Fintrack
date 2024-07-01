//waiting function
export const wait = ()=>new Promise((res)=>setTimeout(res,800));

//getting the data from local storage
export function fetchData(key) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
}

//delete the data in local storage
export function deleteItem({key}) {
    return localStorage.removeItem(key);
 }

 
//generating random colors for budgets
const generateRandomColor = ()=>{
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`;
}

//Matching Items from List of Items
export const matchItems = ({category,key,value})=>{
    const items = fetchData(category)??[];
    return items.filter((item)=>item[key] === value);
}

//creating budget and adding new budgetItem into the existing budgets
export const createBudget = ({newBudget,amount})=>{

    const newItem = {
        name:newBudget,
        amount:+amount,
        id:crypto.randomUUID(),
        createdAt:Date.now(),
        color:generateRandomColor(),
    };

    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets",JSON.stringify([...existingBudgets,newItem]));

}

//creating new Expense 
export const createExpense = ({newExpense,newExpenseAmount,newExpenseBudget})=>{

    const newItem = {
        name:newExpense,
        amount:+newExpenseAmount,
        createdAt:Date.now(),
        id:crypto.randomUUID(),
        budgetId:newExpenseBudget,
    };

    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses",JSON.stringify([...existingExpenses,newItem]));

}

//Delete Item in a list of items
export const deleteItemsInList = ({category,key,value})=>{
    const newListItems = (fetchData(category)??[]).filter((item)=>item[key] !== value);
    deleteItem({key:category});
    localStorage.setItem(category,JSON.stringify(newListItems));
}

//Formatting

//Format currency
export const formatCurrency = (amount)=>{
    return amount.toLocaleString(undefined,{
        style:"currency",
        currency:"USD",
    })
}

//Formatting Percentage
export const formatPercentage = (amt)=>{
    return amt.toLocaleString(undefined,{
        style:"percent",
        minimumFractionDigits:0,
    })
}

//Formatting Date
export const formatDateToLocalString = (ms)=>{
    return new Date(ms).toLocaleDateString();
}


//total spent by budget
export const calculateSpentByBudget = (budgId)=>{
    const expenses = fetchData("expenses") ?? [];
    return expenses.reduce((accumulator,currentValue)=>
        (currentValue.budgetId === budgId)?(accumulator + currentValue.amount):(accumulator)
    ,0);
}

