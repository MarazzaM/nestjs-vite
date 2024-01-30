import { LoginForm } from '@/components/ui/auth/LoginForm'
import { useState } from "react";
import { RegisterForm } from '@/components/ui/auth/RegisterForm';

function Login() {
  const [login, setLogin] = useState<boolean | null>(true);

  return (
    <div className='w-full h-full'>
      <div className='justify-center flex items-center flex-col'>
      {login ? <LoginForm /> : <RegisterForm setLogin={setLogin} />}
        {login ?  (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <button onClick={() => setLogin(false)} className="font-semibold text-gray-800">
            Sign up
          </button>{" "}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button onClick={() => setLogin(true)} className="font-semibold text-gray-800">
            Sign in
          </button>{" "}
          instead.
        </p>
      )}
      </div>
    </div>
  )
}

export default Login