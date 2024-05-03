import theme from '../theme';
import { TextInput, View, StyleSheet, Text, Pressable } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from "react-router-dom";

const styles = StyleSheet.create({
  input: {
    fontSize: theme.fontSizes.formInput,
    padding: 5,
    borderWidth : 1,
    margin: 5,
    borderRadius: 5
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 8
  },
  submitText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.formInput
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username should be longer than 5 symbols')
    .max(30, 'Username should be smaller than 30 symbols'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password should be longer than 5 symbols')
    .max(30, 'Password should be smaller than 30 symbols'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not match')
    .required('Password confirm is required')
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({username, password});
      const result = await signIn({ username, password });
      if (result) {
        navigate('/');
      }
    } catch(e) {
      console.log(e);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => onSubmit(values)
  }); 


  return (
    <View>
      <TextInput
        style={[styles.input, formik.errors.username && { borderColor: 'red'}]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red', marginLeft: 5 }}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[styles.input, formik.errors.password && { borderColor: 'red'}]}
        placeholder="Password"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red', marginLeft: 5 }}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={[styles.input, formik.errors.passwordConfirmation && { borderColor: 'red'}]}
        placeholder="Password Confirmation"
        secureTextEntry={true}
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={{ color: 'red', marginLeft: 5 }}>{formik.errors.passwordConfirmation}</Text>
      )}
      
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

export default SignUp;