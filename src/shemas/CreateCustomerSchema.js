
import { object, string } from 'yup';
export const CreateCustomerSchema = object().shape({
  first_name: string().required("First name is required"),
  last_name: string().required("Last name is required"),
  email: string().required("Email is required").email("Please provide a valid email address"),
  home_address: string().required("Home address is required"),
  date_of_birth: string().required("Date of birth is required"),
  telephone: string().required("Phone number is required").min(11, 'Phone number is incomplete'),
  state: string().required("State is required"),
  city: string().required("City is required"),
});
