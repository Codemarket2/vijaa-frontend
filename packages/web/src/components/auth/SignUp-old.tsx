import * as React from 'react';
 import {
   Formik,
   FormikHelpers,
   FormikProps,
   Form,
   Field,
   FieldProps,
 } from 'formik';
 
 interface MyFormValues {
   firstName: string;
 }
 
 const Signup: React.FC<{}> = () => {
   const initialValues: MyFormValues = { firstName: '' };
   return (
     <div>
       <h1>My Example</h1>
       <Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {
           console.log({ values, actions });
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }}
       >
         <Form>
           <label htmlFor="firstName">First Name</label><br></br>
           <Field id="firstName" name="firstName" placeholder="First Name" /><br></br>
           <label htmlFor="firstName">Last Name</label>
           <Field id="firstName" name="firstName" placeholder="First Name" /><br></br>
           <label htmlFor="firstName">Email</label>
           <Field id="firstName" name="firstName" placeholder="First Name" /><br></br>
           <label htmlFor="firstName">Password</label>
           <Field id="firstName" name="firstName" placeholder="First Name" /><br></br>
           <button type="submit">Submit</button>
         </Form>
       </Formik>
     </div>
   );
 };
 export default Signup;