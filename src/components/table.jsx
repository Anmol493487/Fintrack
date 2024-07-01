//component imports
import ExpenseItem from "./expense-item";

export default function Table({expenses,showBudget=true}) {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Data</th>
                        {
                            showBudget && <th>Budget</th>
                        }
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                {
                    expenses.map((exp)=>
                    (
                        <tr key={exp.id}>
                            <ExpenseItem expense={exp} showBudget={showBudget} />
                        </tr>
                    ))
                }
                </tbody>

            </table>
        </div>

    )
}