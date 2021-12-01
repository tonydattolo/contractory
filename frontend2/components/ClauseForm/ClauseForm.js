import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  clauses: yup.array().of(
    yup.object().shape({
      clause: yup.string().required(),
      clause_type: yup.string().required(),
      clause_id: yup.string().required(),
      clause_name: yup.string().required(),
      content: yup.string().required(),
    })
  ),
});

export default function ClauseForm({ contract, clauses }) {


  console.log(`clauses: ${clauses}`)
  console.log(`clauses stringify: ${JSON.stringify(clauses)}`)

  return (
    <>

    <h5>Clauses for {contract.id}</h5>
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        clauses: [
          clauses
          // {
          //   clause: '',
          //   clause_type: '',
          //   clause_id: '',
          //   clause_name: '',
          //   content: '',
          // },
        ],
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          {clauses.map((clause, index) => (
            <Form.Group key={index}>

              {/* <Form.Label>Clause</Form.Label>
              <Form.Control
                type="text"
                name={`clauses[${index}].clause`}
                value={values.clauses[index].clause}
                onChange={handleChange}
                isInvalid={!!errors.clauses[index].clause}
              />
              <Form.Control.Feedback type="invalid">
                {errors.clauses[index].clause}
              </Form.Control.Feedback> */}

              {/* <Form.Label>Clause ID</Form.Label>
              <Form.Control
                type="text"
                name={`clauses[${index}].clause_id`}
                value={values.clauses[index].clause_id}
                onChange={handleChange}
                isInvalid={!!errors.clauses[index].clause_id}
              />
              <Form.Control.Feedback type="invalid">
                {errors.clauses[index].clause_id}
              </Form.Control.Feedback> */}
              <h5>Clause ID: {clauses[index].id}</h5>
              <h5>Clause ID: {clause.id}</h5>
              <Form.Label>Clause Content</Form.Label>
              <Form.Control
                type="text"
                name={`clauses[${index}].content`}
                value={values.clauses[index].content}
                onChange={handleChange}
                isInvalid={!!errors.clauses[index].content}
              />
              <Form.Control.Feedback type="invalid">
                {errors.clauses[index].content}
              </Form.Control.Feedback>

            </Form.Group>
          ))}
          {/* <Button
            type="button"
            onClick={() => {
              values.clauses.push({
                clause: '',
                clause_type: '',
                clause_id: '',
                clause_name: '',
                content: '',
              });
            }}
          >
            Add Clause
          </Button> */}
          <Button type="submit">Save</Button>
        </Form>
      )}
    </Formik>
    </>
  );
}
