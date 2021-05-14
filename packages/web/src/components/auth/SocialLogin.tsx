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
 
 const SocialLogin: React.FC<{}> = () => {
   const initialValues: MyFormValues = { firstName: '' };
   return (
     <div>
       <h1>Smart Coach</h1>
       <Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {
           console.log({ values, actions });
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }}
       >
         <Form>
           <label htmlFor="firstName">Sign Up Already have an account? Login</label><br></br>
           {/* <Field id="firstName" name="firstName" placeholder="First Name" /> */}
           <button type="submit">Facebook</button><br></br>
           <button type="submit">Google</button><br></br>
           <button type="submit">LinkedIn</button><br></br>
         </Form>
       </Formik>
     </div>
   );
 };
 export default SocialLogin;