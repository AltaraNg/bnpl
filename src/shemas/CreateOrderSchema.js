import {  object, string } from 'yup';
const phoneRegExp = /^([0]{1})[0-9]{10}$/;
export const CreateOrderSchema = object().shape({
    product: string().required("Product name is required"),
    amount: string().required("Product amount is required").min(1, 'Supplied amount is to small'),
    repayment_duration_id: string().required("Please select repayment duration"),
    repayment_cycle_id: string().required("Please select repayment cycle"),
    first_guarantor_first_name: string().required("First name is required"),
    first_guarantor_last_name:  string().required("Last name is required"),
    first_guarantor_telephone:  string().required("Telephone is required").matches(phoneRegExp, "Invalid phone number."),
    first_guarantor_home_address:  string().required("Home address is required"),
    second_guarantor_first_name:  string().required("First name is required"),
    second_guarantor_last_name:  string().required("Last name is required"),
    second_guarantor_telephone: string().required("Telephone is required").matches(phoneRegExp, "Invalid phone number."),
    second_guarantor_home_address: string().required("Home address is required"),
});
