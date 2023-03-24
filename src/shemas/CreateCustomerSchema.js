
import { object, string } from 'yup';
const phoneRegExp = /^([0]{1})[0-9]{10}$/;
export const CreateCustomerSchema = object().shape({
  first_name: string().required("First name is required"),
  last_name: string().required("Last name is required"),
  email: string().required("Email is required").email("Please provide a valid email address"),
  home_address: string().required("Home address is required"),
  date_of_birth: string().required("Date of birth is required"),
  telephone: string().required("Phone number is required").matches(phoneRegExp, "Invalid phone number."),
  state: string().required("State is required"),
  city: string().required("City is required"),
});
