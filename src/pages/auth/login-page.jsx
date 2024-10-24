import { LoginForm } from "./components";

export const LoginPage = () => {

  return (
    <section className="flex max-md:flex-col h-screen w-screen">
    {/* <section className="max-w-screen-xl flex flex-wrap h-screen items-center justify-between mx-auto p-4"> */}
      <div className="bg-blue-100 md:h-full max-md:flex-grow md:w-1/2 grid place-items-center">
        <p className="font-semibold text-5xl">Products App</p>
      </div>
      <div className="bg-blue-400 md:h-full md:w-1/2 h-[80%] grid place-items-center">
        <section className=" w-1/2 flex flex-col gap-4 items-center">
          <p className="font-semibold text-white text-3xl">Log in</p>
          <LoginForm />
        </section>
      </div>
    </section >
  );
};