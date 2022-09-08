import ExpensesOutput from "../components/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";

const AllExpenses = () => {
    const {expenses} = useContext(ExpensesContext);
    return (
        <ExpensesOutput
            expenses={expenses}
            expensesPeriod={'Total'}
            fallbackText={'No expenses registered for all time'}
        />
    )
}

export default AllExpenses;