function Login() {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 mb-4 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 mb-4 border rounded-md"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Login
          </button>
          <p className="text-center mt-4 text-gray-600">
            Don`t have an account? <a href="/Signup" className="text-blue-500">Sign up</a>
          </p>
        </div>
      </div>
    );
  }
  
  export default Login;
  