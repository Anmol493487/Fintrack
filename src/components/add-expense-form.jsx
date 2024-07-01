//react imports
import { useEffect,useRef } from "react";

//rrd imports
import { useFetcher } from "react-router-dom";


export default function AddExpenseForm({budgets}) {
    budgets.sort((b1,b2)=>b1.createdAt - b2.createdAt)
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();

    useEffect(()=>{
        if(!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    },[isSubmitting])

    return (
        <div className="form-wrapper">
            
            <h2 className="h3">Add New {" "}<span className="accent">{budgets.length === 1 && budgets[0].name}{" "}</span>Expense</h2>
            
            <fetcher.Form className="grid-sm" ref={formRef} method="post">
                <div className="expense-inputs">

                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name </label>
                        <input ref={focusRef} type="text" id="newExpense" name="newExpense" placeholder="e.g., Coffee" required/>
                    </div>

                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Expense Amount</label>
                        <input type="number" step="0.01" inputMode="decimal" placeholder="e.g., $100" id="newExpenseAmount" name="newExpenseAmount" required/>
                    </div>
                </div>


                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select id="newExpenseBudget" name="newExpenseBudget" required>
                        {
                            budgets.map((b)=><option value={b.id} key={b.id}>{b.name}</option>)
                        }
                    </select>
                </div>


                <input type="hidden" name="_action" value="addExpense"/>
                
                <button className="btn btn--dark" type="submit" disabled={isSubmitting}>
                    {
                        isSubmitting?"Submitting....":"Add Expense"
                    }
                </button>
                
            </fetcher.Form>

        </div>
    );
}



