"use client";

import { FormInput } from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const connectionFormSchema = z.object({
  Email: z.string().min(1, "L'adresse email est obligatoire"),
  Password: z.string().min(1, "Le mot de passe est obligatoire"),
});

const ConnectionForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof connectionFormSchema>>({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: zodResolver(connectionFormSchema),
  });

  const signInError = (e: string) => {
    console.error(e);
    form.setValue("Password", "");
    form.setError(
      "Password",
      {
        type: "manual",
        message: "Adresse email ou mot de passe incorrect",
      },
      { shouldFocus: true }
    );
  };

  const onSubmit = (data: z.infer<typeof connectionFormSchema>) => {
    startTransition(async () => {
      try {
        if (!signIn) return;
        const result = await signIn.create({
          identifier: data.Email,
          password: data.Password,
        });

        if (result.status === "complete" && setActive) {
          await setActive({ session: result.createdSessionId! });
          router.push("/");
        }
      } catch (err) {
        signInError(err as string);
        toast.error("Erreur lors de la connexion");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onChange={() => form.clearErrors()}
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <FormInput
          label="Adresse email"
          placeholder="Adresse email"
          disabled={isPending || !isLoaded}
          name="Email"
          type="text"
          className="bg-white"
          required
        />
        <FormInput
          label="Mot de passe"
          placeholder="Mot de passe"
          disabled={isPending || !isLoaded}
          name="Password"
          type="password"
          className="bg-white"
          required
        />
        <Button type="submit" disabled={isPending || !isLoaded}>
          Valider
        </Button>
        <Link className="text-xs text-center" href="/auth/signUp">
          Créer un compte
        </Link>
      </form>
    </Form>
  );
};

export default ConnectionForm;
