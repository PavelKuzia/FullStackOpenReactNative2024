import { TextInput, View, StyleSheet, Text, Pressable } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useCreateRepository from '../hooks/useCreateReview';
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

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: ''
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .moreThan(-1, 'Rating should be bigger than zero')
    .lessThan(101, 'Rating should be smaller than hundred')
});

const ReviewForm = () => {
  const [createReview] = useCreateRepository();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const result = await createReview(values);
      console.log(result);
      if (result) {
        const id = result;
        navigate(`/repository/${id}`);
      }      
    } catch (e) {
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
        style={[styles.input, formik.errors.ownerName && { borderColor: 'red'}]}
        placeholder="Owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: 'red', marginLeft: 5 }}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[styles.input, formik.errors.repositoryName && { borderColor: 'red'}]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: 'red', marginLeft: 5 }}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[styles.input, formik.errors.rating && { borderColor: 'red'}]}
        placeholder="Rating"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red', marginLeft: 5 }}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[styles.input, formik.errors.review && { borderColor: 'red'}]}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        multiline={true}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{ color: 'red', marginLeft: 5 }}>{formik.errors.review}</Text>
      )}
      
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Create a review</Text>
      </Pressable>
    </View>
  )
}

export default ReviewForm;