import { MdAlternateEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";

export default function Login() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-300">
      <div className="px-16 py-12 bg-white max-w-[1100px] shadow-xl">
        <h2 className="text-3xl font-semibold text-left uppercase">FINITUM</h2>
        <h3 className="text-3xl text-left text-gray-700 uppercase">
          Already registered?
        </h3>
        <div className="flex justify-between w-[100%]">
          <p className="text-sm font-thin text-gray-600">Please sign in</p>
        </div>

        <div className="flex items-center gap-2 p-2  border border-gray-300">
          <MdAlternateEmail />
          <input
            className="w-[100%] font-thin border-none focus:outline-none"
            type="email"
            name=""
            id=""
            placeholder="email address"
          />
        </div>
        <div className="flex items-center gap-2 p-2 mt-2 border border-gray-300">
          <IoMdKey />
          <input
            className="w-[100%] font-thin border-none focus:outline-none"
            type="password"
            name=""
            id=""
            placeholder="password"
          />
        </div>
        <p className="text-blue-400 cursor-pointer hover:underline">
          Forget password?
        </p>
        <button className="px-6 w-[50%] py-2 text-white bg-red-500 font-semibold rounded-md mt-6">
          Submit
        </button>
      </div>
    </div>
  );
}
