import ExpensesOutput from "../components/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDayMinusDays} from "../util/date";
import {fetchExpenses} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
    const {expenses, setExpenses} = useContext(ExpensesContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const recentExpenses = expenses.filter(expense => {
        const today = new Date();
        const date7DaysAgo = getDayMinusDays(today, 7);

        return (expense.date > date7DaysAgo) && (expense.date < today);
    });
    useEffect(() => {
        const getExpense = async () => {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                setExpenses(expenses)
            } catch (e) {
                setError(e.message);
            }
            setIsFetching(false)
        }
        getExpense();

    },[]);

    if (isFetching) {
        return <LoadingOverlay />
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error}/>
    }

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod={'Lat 7 Days'}
            fallbackText={'No expenses registered for the last 7 days'}
        />
    )
}

export default RecentExpenses;