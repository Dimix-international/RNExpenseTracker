import {StyleSheet, View } from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpenseServer, storeExpense, updateExpenseServer} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({route, navigation}) => {
    const { id } = route?.params || {};
    const {addExpense, updateExpense, deleteExpense, expenses} = useContext(ExpensesContext);
    const isEditing = !!id;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const selectedExpense = expenses.find(ex => ex.id === id);

    const deleteExpenseHandler = async () => {
        setIsSubmitting(true);
        try {
            await deleteExpenseServer (id);
            deleteExpense(id);
            navigation.goBack();
        } catch (e) {
            setError(e.message)
        } finally {
            setIsSubmitting(false);
        }
    }

    const cancelHandler = () => {
        navigation.goBack(); //вернут на -1
    }

    const confirmHandler = async (expenseData) => {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                updateExpense(id, expenseData);
                await updateExpenseServer(id, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                addExpense({...expenseData, id});
            }
            navigation.goBack();
        } catch (e) {
            setError('Could not ave data! Please try again!')
        } finally {
            setIsSubmitting(false);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[navigation, isEditing]);

    if (isSubmitting) {
        return <LoadingOverlay />
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }



    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButtonLabel={ isEditing ? 'Update' : 'Add'}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValue={selectedExpense}
            />
            {
                isEditing && (
                    <View style={styles.deleteContainer}>
                        <IconButton
                            name={'trash'}
                            size={24}
                            color={GlobalStyles.colors.error500}
                            onPress={deleteExpenseHandler}/>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
   deleteContainer: {
       marginTop: 16,
       paddingTop: 8,
       borderTopWidth: 2,
       borderTopColor: GlobalStyles.colors.primary200,
       alignItems: 'center',
   },
})

export default ManageExpense;