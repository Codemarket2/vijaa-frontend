import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import {Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';

export const addOffering = () => {
    return(
        <>
            <Card>
                <CardContent>
                    <Formik initialValues={{ 
                        firstName: '',
                        lastName: '',
                        millionaire: false,
                        money: 0,
                        description: ''
                    }} onSubmit={() => {}}>
                        <Form>
                            <Field name="firstname" component={TextField} label="First Name"/>
                            <Field name="lastname" component={TextField} label="Last Name"/>
                            <Field name="millionaire" type="checkbox" component={CheckboxWithLabel} Label={{ label: 'I am a millionaire' }} />
                            <Field name="money" type="number" component={TextField} label="All the Money I have"/>
                            <Field name="description" type component={TextField} label="Description"/>
                        </Form>
                    </Formik>
                </CardContent>
            </Card>
        </>
    )
}
