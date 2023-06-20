import RegisterForm from '@components/Auth/RegisterForm';
import AuthLayout from '@hoc/layouts/AuthLayout';

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
export default RegisterPage;
