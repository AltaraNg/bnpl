import { string, number } from "yup";
import * as Yup from "yup";;
const phoneRegExp = /^([0]{1})[0-9]{10}$/;
export function CreateOrderSchema(orders) {
    return Yup.object().shape({
        product: string().required("Product name is required"),
        amount: orders?.length
            ? number()
                  .transform((value, originalValue) => {
                      const numberValue = Number(originalValue.replace(/[^0-9.-]+/g, ""));
                      return isNaN(numberValue) ? undefined : numberValue;
                  })
                  .min(20000, "Amount must be greater than NGN20,000")
                  .max(125000, "Amount must be less than or equal to NGN125,000")
            : number()
                  .transform((value, originalValue) => {
                      const numberValue = Number(originalValue.replace(/[^0-9.-]+/g, ""));
                      return isNaN(numberValue) ? undefined : numberValue;
                  })
                  .min(20000, "Amount must be greater than NGN20,000")
                  .max(100000, "Amount must be less than or equal to NGN100,000"),
        repayment_duration_id: string().required("Please select repayment duration"),
        repayment_cycle_id: string().required("Please select repayment cycle"),
        first_guarantor_first_name: string().required("First name is required"),
        first_guarantor_last_name: string().required("Last name is required"),
        first_guarantor_telephone: string().required("Telephone is required").matches(phoneRegExp, "Invalid phone number."),
        first_guarantor_home_address: string().required("Home address is required"),
        second_guarantor_first_name: string().required("First name is required"),
        second_guarantor_last_name: string().required("Last name is required"),
        second_guarantor_telephone: string().required("Telephone is required").matches(phoneRegExp, "Invalid phone number."),
        second_guarantor_home_address: string().required("Home address is required"),
    });
}
