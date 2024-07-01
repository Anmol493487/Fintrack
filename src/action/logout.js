import { deleteItem } from "../helper";
import { redirect } from "react-router-dom";
import {toast} from "react-toastify";

export default function logoutAction(){
    //delete the user Account
    deleteItem({key:"userName"});
    deleteItem({key:"budgets"});
    deleteItem({key:"expenses"});
    //show notification
    toast.success("You've deleted your Account!");
    //return redirect
    return redirect("/");
}
