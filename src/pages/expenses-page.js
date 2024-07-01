//rrd imports
import { useLoaderData } from "react-router-dom";

//helper imports
import { deleteItemsInList, fetchData } from "../helper"

//component imports
import Table from "../components/table";

//toastify imports
import { toast } from "react-toastify";

//route element
export default function ExpensesPage() {
    const expenses = useLoaderData();

    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {
                (expenses && expenses.length > 0)?(
                    <div className="grid-md">
                        <h2>Recent Expenses <small>( {expenses.length} total )</small></h2>
                        <Table expenses={expenses.sort((exp1,exp2)=>exp2.createdAt-exp1.createdAt)} />
                    </div>
                ):
                (<p>No Expenses to show</p>)
            }
        </div>
    );

}

//loader function 
export const expensesPageLoader = ()=>{
    const expenses = fetchData("expenses");
    return expenses;
}

//action function 
export const expensesPageAction = async ({request})=>{
    const data = await request.formData();
    try{
        deleteItemsInList({category:"expenses",key:"id",value:data.get("expenseId")});
        return toast.success('Expense deleted succesfully');
    }catch(e){
        throw new Error("There was some problem while deleting Expense to the Budget");
    }
}