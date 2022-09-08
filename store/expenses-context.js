import {createContext, useMemo, useReducer} from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
    setExpenses: (expenses) => {}
});

const ADD_ACTION = 'ADD';
const DELETE_ACTION = 'DELETE';
const UPDATE_ACTION = 'UPDATE';
const SET_ACTION = 'SET';

const expensesReducer = (state, action) => {
    switch (action.type) {
        case ADD_ACTION: {
            return [action.payload , ...state]
        }
        case SET_ACTION: {
            return action.payload.reverse();
        }
        case DELETE_ACTION: {
            return state.filter(item => item.id !== action.payload.id)
        }
        case UPDATE_ACTION: {
            const { id, data } = action.payload;
            return state.map(item => item.id === id ? {id, ...data} : item)
        }
        default: return state;
    }
}

const ExpensesContextProvider = ({children}) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    const addExpense = (expenseData) => {
        dispatch({
            type: ADD_ACTION,
            payload: expenseData
        });
    };

    const deleteExpense = (id) => {
        dispatch({
            type: DELETE_ACTION,
            payload: {id}
        });
    }

    const updateExpense = (id, expenseData) => {
        dispatch({
            type: UPDATE_ACTION,
            payload: {id, data: expenseData}
        });
    }

    const setExpenses = (expenses) => {
        dispatch({
            type: SET_ACTION,
            payload: expenses
        });
    }

    const value = useMemo(() => ({
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses,
    }),[expensesState])

    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
}

export default ExpensesContextProvider;