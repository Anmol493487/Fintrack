//helper imports
import { deleteItemsInList } from "../helper";

//rrd imports
import { redirect } from "react-router-dom";

//toast lib imports
import { toast } from "react-toastify";

export default function deleteBudget({params}) {
    try{
        deleteItemsInList({category:"budgets",key:"id",value:params.id});
        deleteItemsInList({category:"expenses",key:"budgetId",value:params.id});
        toast.success('Budget Deleted successfully!');
        return redirect("/");
    }
    catch(e){
        throw new Error('There was some problem while deleting this Budget');
    }

}