import React, { FC } from 'react';
import { Formik } from 'formik';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';
import useStyles from './styles';

interface IProps {
  row: any;
  onSubmit: (values: any) => void;
}

const FormRow: FC<IProps> = ({ row, onSubmit }) => {
  const initialValues = {
    firstName: row?.firstName || '',
    lastName: row?.lastName || '',
    phone: row?.phone || '',
    email: row?.email || '',
    address: row?.address || '',
    id: row?.id || null,
  };
  const classes = useStyles();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          }

          if (!values.lastName) {
            errors.lastName = 'Required';
          }

          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              error={!!errors.firstName}
              id="firstName"
              name="firstName"
              label="First Name"
              helperText={errors.firstName}
              value={values.firstName}
              variant="filled"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <TextField
              error={!!errors.lastName}
              id="lastName"
              name="lastName"
              label="Last Name"
              helperText={errors.lastName}
              value={values.lastName}
              variant="filled"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <TextField
              error={!!errors.phone}
              helperText={errors.phone}
              id="phone"
              name="phone"
              label="Phone"
              value={values.phone}
              variant="filled"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              error={!!errors.email}
              helperText={errors.email}
              id="email"
              name="email"
              label="email"
              value={values.email}
              variant="filled"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              error={!!errors.address}
              helperText={errors.address}
              multiline
              id="address"
              name="address"
              label="address"
              value={values.address}
              variant="filled"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && touched.firstName && errors.firstName}
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}

      </Formik>
    </div>
  );
};

export default FormRow;
