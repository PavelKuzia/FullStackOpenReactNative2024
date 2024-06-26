import { useFormik } from 'formik';
import * as yup from 'yup';
import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from "react-router-dom";
import theme from '../theme'
import useSignIn from '../hooks/useSignIn';

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
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const result = await signIn({ username, password });
      if (result) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  );  
};

export const SignInContainer = ({onSubmit}) => {
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
        secureTextEntry={true}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red', marginLeft: 5 }}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Sign In</Text>
      </Pressable>
    </View>
  );
}

export default SignInForm;