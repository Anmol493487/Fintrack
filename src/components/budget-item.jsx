//helper imports
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helper";

//rrd imports
import {Form,Link} from "react-router-dom";

export default function BudgetItem({budget,showBudget=true}) {
    const {id,name,amount,color} = budget;
    const spent = calculateSpentByBudget(id);
    const remaining = budget.amount - spent;

    return (
        <div style={{"--accent":color}} className="budget">

            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>

            <progress max={amount} value={spent}>
                {
                    formatPercentage(spent/amount)
                }
            </progress>

            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(remaining)} remaining</small>
            </div>

            {
                showBudget?(
                    <div className="flex-sm">
                        <Link to={`/budget/${id}`} className="btn"><span>View Details</span></Link>
                    </div>
                ):(
                    <div className="flex-sm">
                        <Form method="post" action="delete" onSubmit={(event)=>{
                            if(!window.confirm('Are you sure?, Your action will delete this budget permanently')){
                                event.preventDefault();
                            }
                        }}>

                            <button type="submit" className="btn">Delete</button>
                        </Form>
                    </div>
                )
            }

        </div>
    )
}