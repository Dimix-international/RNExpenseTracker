import axios from "axios";

const BACKEND_URL = 'https://react-native-course-77ac1-default-rtdb.firebaseio.com';

export const storeExpense = async (expensesData) => {
   const { data } = await axios.post(`${BACKEND_URL}/expenses.json`,
        expensesData
    );

   return data.name; //id from firebase
};

export const fetchExpenses = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/expenses.json`);
  //transform объект в массив
    const expenses = [];

    for (const key in data) {
        const expenseObj = {
            id: key,
            amount: data[key].amount,
            date: new Date(data[key].date),
            description: data[key].description,
        };
        expenses.push(expenseObj);
    }

    return expenses;
}

export const updateExpenseServer = async (id, data) => {
   return await axios.put(`${BACKEND_URL}/expenses/${id}.json`, data);
}

export const deleteExpenseServer = async (id) => {
    return await axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
