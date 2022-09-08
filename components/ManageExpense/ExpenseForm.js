import {View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/date";
import {GlobalStyles} from "../../constants/styles";

const ExpenseForm = ({submitButtonLabel, onCancel, onSubmit, defaultValue}) => {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValue ? defaultValue.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValue ? getFormattedDate(defaultValue.date) : '',
            isValid: true,
        },
        description: {
            value: defaultValue ? defaultValue.description :  '',
            isValid: true,
        }
    });

    const setInputValuesHandler = (key, enteredValue) => {
        setInputs(prev => ({
            ...prev,
            [key] : { value: enteredValue, isValid: true, }
        }))
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value.trim()
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const isValidDescription = expenseData.description.length > 0;

        if( !amountIsValid || !dateIsValid || !isValidDescription) {
            setInputs(prev => ({
                amount: {value: prev.amount.value, isValid: amountIsValid},
                date: {value: prev.date.value, isValid: dateIsValid},
                description: {value: prev.description.value, isValid: isValidDescription},
            }))
            return;
        }
        onSubmit(expenseData);
    }

    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense!</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label={'Amount'}
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        value:inputs.amount.value,
                        keyboardType: 'decimal-pad',
                        onChangeText: (value) => setInputValuesHandler('amount', value),
                }}
            />
                <Input
                    style={styles.rowInput}
                    label={'Date'}
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: setInputValuesHandler.bind(this, 'date'),
                        value:inputs.date.value,
                        keyboardType:'number-pad',
                    }}
                />
            </View>
            <Input
                label={'Description'}
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    autoCorrect: false,
                    autoCapitalize: 'sentences', //default
                    onChangeText: setInputValuesHandler.bind(this, 'description'),
                    value:inputs.description.value,
                }}
            />
            {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
            <View style={styles.buttons}>
                <Button
                    style={styles.buttonStyle}
                    mode={'flat'}
                    onPress={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    style={styles.buttonStyle}
                    onPress={submitHandler}
                >
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        marginVertical: 15,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})

export default ExpenseForm;