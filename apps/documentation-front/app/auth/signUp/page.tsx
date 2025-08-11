import SignUpForm from "./signUpForm";

export default async function Home() {
  return (
    <>
      <h2 className="font-bold text-3xl text-center mb-12">Créer un compte</h2>
      <SignUpForm />
    </>
  );
}
