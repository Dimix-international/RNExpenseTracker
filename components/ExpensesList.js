import {FlatList} from "react-native";
import ExpenseItem from "./ExpenseItem";


const renderExpenseData = (itemData) => {
    return <ExpenseItem
        {...itemData.item}
    />
}

const ExpensesList = ({expenses}) => {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseData}
            keyExtractor={(item) => item.id}
        />
    )
}

export default ExpensesList;