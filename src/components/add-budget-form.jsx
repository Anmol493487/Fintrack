//library import
import {useRef,useEffect} from "react";
import { useFetcher } from "react-router-dom"

export default function AddBudgetForm() {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();

    useEffect(()=>{
        if(!isSubmitting){
            formRef.current.reset();
            focusRef.current.focus();
        }
    },[isSubmitting]);

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create budget
            </h2>
            <fetcher.Form ref={formRef} method="post" className="grid-sm">
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input ref={focusRef} type="text" name="newBudget" id="newBudget" placeholder="e.g., Groceries" required />
                </div>
                <div className="grid-xs">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" name="amount" id="amount" placeholder="e.g., $500" step={0.01} inputMode="decimal" required /> 
                </div>
                <input type="hidden" name="_action" value="createBudget" />
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting?"Submitting....":"Create budget"
                    }
                </button>
            </fetcher.Form>
            
        </div>
    )
}