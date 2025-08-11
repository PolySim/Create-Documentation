import ConnectionForm from "./connexionForm";

export const metadata = {
  title: "Connexion",
};

export default async function Home() {
  return (
    <>
      <h2 className="font-bold text-3xl text-center mb-12">Se connecter</h2>
      <ConnectionForm />
    </>
  );
}
