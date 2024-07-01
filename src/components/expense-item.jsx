//helper imports
import { formatCurrency, formatDateToLocalString, matchItems } from "../helper";

//rrd imports
import { NavLink,useFetcher } from "react-router-dom";



export default function ExpenseItem({expense,showBudget=true}){
    const fetcher = useFetcher();

    const budget = matchItems({category:"budgets",key:"id",value:expense.budgetId})[0];
    return (
        <>
        <td>{expense.name}</td>
        <td>{formatCurrency(expense.amount)}</td>
        <td>{formatDateToLocalString(expense.createdAt)}</td>
        {
            showBudget && <td><NavLink to={`budget/${budget.id}`} style={{"--accent":budget.color}}>{budget.name}</NavLink></td>
        }
        <td>
            {
                <fetcher.Form method="post">
                    <input type="hidden" name="expenseId" value={expense.id}/> 
                    <input type="hidden" name="_action" value="deleteExpense"/>
                    <button type="submit" className="btn btn--warning" aria-label={`Delete ${expense.name} expense`}>Delete</button>
                </fetcher.Form>
            }
        </td>
        </>
    );

}