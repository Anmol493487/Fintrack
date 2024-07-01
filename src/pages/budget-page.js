//rrd imports
import { useLoaderData } from "react-router-dom";

//helper imports
import { createExpense, deleteItemsInList, matchItems } from "../helper"

//toastify library
import { toast } from "react-toastify";

//component imports
import BudgetItem from "../components/budget-item";
import AddExpenseForm from "../components/add-expense-form";
import Table from "../components/table";

export default function BudgetPage() {
    const {budget,expenses} = useLoaderData();

    return (
        <div className="grid-lg" style={{"--accent":budget.color}}>
            <h1 className="h2">
                <span className="accent">{budget.name}</span> 
                {" "}Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showBudget={false} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {
                (expenses && expenses.length > 0 && 
                    <div className="grid-md">
                        <h2><span className="accent">{budget.name}</span>{" "}Expenses</h2>
                        <Table showBudget={false} expenses={expenses.sort((exp1,exp2)=>exp2.createdAt-exp1.createdAt).slice(0,8)} />
                    </div>
                )
            }

        </div>
    )

}

//loader function
export const budgetPageLoader = ({params})=>{
    const budget = matchItems({category:"budgets",key:"id",value:params.id})[0];
    const expenses = matchItems({category:"expenses",key:"budgetId",value:params.id});
    if(!budget){
        throw new Error("The Budget you're trying to find doesn't exist")
    }
    return {budget,expenses};
}

//action function 
export const budgetPageAction = async({request})=>{

    const data = await request.formData();
    const {_action,...values} = Object.fromEntries(data);

    if(_action === "addExpense"){
        try{
            createExpense(values);
            return toast.success(`Expense ${values.newExpense} created successfully`);
        }catch(e){
            throw new Error("There was some problem while adding New Expense to the Budget");
        }
    }
    else if(_action === "deleteExpense"){
        try{
            deleteItemsInList({category:"expenses",key:"id",value:values.expenseId});
            return toast.success('Expense deleted succesfully');
        }catch(e){
            throw new Error("There was some problem while deleting Expense to the Budget");
        }
    }
}