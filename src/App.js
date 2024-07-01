//react-dom
import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route, } from "react-router-dom";

//notification-library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//action
import logoutAction from "./action/logout";
import deleteBudget from "./action/delete-budget";

//layout
import RootLayout,{ rootLoader } from "./layouts/root-layout";


//pages
import Error from "./pages/error";
import DashBoard, { dashboardAction, dashboardLoader } from "./pages/dashboard";
import { expensesPageAction, expensesPageLoader } from "./pages/expenses-page";
import ExpensesPage from "./pages/expenses-page";
import BudgetPage, { budgetPageAction, budgetPageLoader } from "./pages/budget-page";

//router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} loader={rootLoader} errorElement={<Error />}>
      <Route index={true} element={<DashBoard />} loader={dashboardLoader} action={dashboardAction} errorElement={<Error />}></Route>
      <Route path="budget/:id" element={<BudgetPage />} loader={budgetPageLoader} action={budgetPageAction} errorElement={<Error />}>
        <Route path="delete" action={deleteBudget} />
      </Route>
      <Route path="expenses" element={<ExpensesPage />} loader={expensesPageLoader} action={expensesPageAction} errorElement={<Error />}/>
      <Route path="logout" action={logoutAction}/>
    </Route>
  ),{basename:"/budget-app"}
);

//App
export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer />
    </div>
  );
}
