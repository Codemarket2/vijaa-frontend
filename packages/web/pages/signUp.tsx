import React from 'react'
import { Fragment } from "react";

import SignUp from '../src/components/auth/Signup'
import SignUp2 from '../src/components/auth/yupSignup'
import { TextInputComponent } from "../src/components/text-input";

export default function SignUpPage() {
  return (
    // <SignUp/>
    // <SignUp2/>
    <Fragment>
      <p>Hello</p>
      <TextInputComponent />
    </Fragment>
  )
}