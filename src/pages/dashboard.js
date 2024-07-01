//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/add-budget-form";
import AddExpenseForm from "../components/add-expense-form";
import BudgetItem from "../components/budget-item";
import Table from "../components/table";

//toastify library
import { toast } from "react-toastify";

//helper
import { wait,createBudget, createExpense, deleteItemsInList, fetchData } from "../helper";


//rrd imports
import { Link,useLoaderData } from "react-router-dom";


//route-element
export default function DashBoard() {
    const {userName,budgets,expenses} = useLoaderData();

    return (
        <>
            {userName?(
                <div className="dashboard">
                    <h1>Welcome Back,<span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        {
                            (budgets && budgets.length > 0)?
                            (
                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm/>
                                        <AddExpenseForm budgets={budgets}/>
                                    </div>
                                    <h2>Existing Budgets</h2>
                                    <div className="budgets">
                                        {
                                            budgets.map((budget)=><BudgetItem key={budget.id} budget={budget} />)
                                        }
                                    </div>
                                    {
                                        (expenses && expenses.length > 0 && 
                                            <div className="grid-md">
                                                <h2>Recent Expenses</h2>
                                                <Table expenses={expenses.sort((exp1,exp2)=>exp2.createdAt-exp1.createdAt).slice(0,8)} />
                                                {
                                                    (expenses.length > 8) && (
                                                        <Link to="expenses" className="btn btn--dark">
                                                            View all expenses
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            )
                            :(
                                <div className="grid-sm">
                                    <p>Personal budgeting is the secret to financial freedom.</p>
                                    <p>Create a budget to get started!</p>
                                    <AddBudgetForm />
                                </div>
                            )
                        }
                    </div> 
                </div>
                ):
                (<Intro />)
            }
        </>
    );
}

//loader 
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return {userName,budgets,expenses};
}

//action
export const dashboardAction = async ({request})=>{
    await wait();
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    const {_action,...values} = formData;
    if(_action === "newUser"){
        try{
            localStorage.setItem("userName",JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`);
        }catch(e){
            throw new Error("There was a problem while creating your account");
        }
    }
    else if(_action === "createBudget"){
        try{
            createBudget(values);
            return toast.success(`Budget ${values.newBudget} created successfully`);
        }catch(e){
            throw new Error("There was a problem while creating budget");
        }
    }
    else if(_action === "addExpense"){
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
    return null;
}