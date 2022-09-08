import {Text, View, StyleSheet} from "react-native";
import {GlobalStyles} from "../constants/styles";

const ExpensesSummary = ({periodName, expenses}) => {

    const expensesSum = expenses.reduce((acc, expense) => {
        return acc + expense.amount;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 14,
        fontWeight: '700',
        color: GlobalStyles.colors.primary500
    }
})

export default ExpensesSummary;