import React from 'react';
import { Fragment } from "react";

import UserLayout from '../src/components/common/UserLayout';
import { TextInputComponent } from "../src/components/text-input";

export default function HomePage() {
  return <UserLayout>HomePage</UserLayout>;
  <Fragment>
      <p>Hello</p>
      <TextInputComponent />
    </Fragment>
}
