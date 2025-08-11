"use client";

import { createUser } from "@/action/user.action";
import { FormInput } from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSignUp, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signUpFormSchema = z
  .object({
    Email: z.email().min(1, "L'adresse email est obligatoire"),
    Password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    ConfirmPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["ConfirmPassword"],
  });

const codeFormSchema = z.object({
  code: z.string().min(1, "Le code est obligatoire"),
});

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [pendingVerification, setPendingVerification] = useState(false);
  const router = useRouter();
  const form = useForm<
    z.infer<typeof signUpFormSchema | typeof codeFormSchema>
  >({
    defaultValues: {
      Email: "",
      Password: "",
      ConfirmPassword: "",
      code: "",
    },
    resolver: zodResolver(
      pendingVerification ? codeFormSchema : signUpFormSchema
    ),
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

  const onSubmit = (
    formdata: z.infer<typeof signUpFormSchema | typeof codeFormSchema>
  ) => {
    startTransition(async () => {
      try {
        const data = z.safeParse(signUpFormSchema, formdata)?.data;
        if (!signUp || !data) return;
        await signUp.create({
          emailAddress: data.Email,
          password: data.Password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setPendingVerification(true);
        form.reset();
      } catch (err) {
        signInError(err as string);
        toast.error("Erreur lors de la connexion");
      }
    });
  };

  const onVerify = (
    formdata: z.infer<typeof codeFormSchema | typeof signUpFormSchema>
  ) => {
    startTransition(async () => {
      try {
        const data = z.safeParse(codeFormSchema, formdata)?.data;
        if (!signUp || !data) return;

        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: data.code,
        });

        if (completeSignUp.status === "complete") {
          console.log(
            completeSignUp,
            completeSignUp.emailAddress,
            completeSignUp.createdUserId
          );
          const user = await createUser({
            email: completeSignUp.emailAddress as string,
            sub_id: completeSignUp.createdUserId as string,
          });

          if (user.success) {
            await setActive({ session: completeSignUp.createdSessionId });
            router.push("/");
          } else {
            toast.error("Erreur de vérification");
          }
        }
      } catch (err) {
        signInError(err as string);
        toast.error("Erreur lors de la vérification");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onChange={() => form.clearErrors()}
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 gap-4"
      >
        {!pendingVerification ? (
          <>
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
            <FormInput
              label="Confirmer le mot de passe"
              placeholder="Confirmer le mot de passe"
              disabled={isPending || !isLoaded}
              name="ConfirmPassword"
              type="password"
              className="bg-white"
              required
            />
            <Button
              type="submit"
              onClick={() => onSubmit(form.getValues())}
              disabled={isPending || !isLoaded}
            >
              Valider
            </Button>
            <Link className="text-xs text-center" href="/auth/signIn">
              Se connecter
            </Link>
          </>
        ) : (
          <>
            <FormInput
              label="Code"
              placeholder="Code"
              disabled={isPending || !isLoaded}
              name="code"
              type="text"
              className="bg-white"
              required
            />
            <Button
              type="submit"
              onClick={() => onVerify(form.getValues())}
              disabled={isPending || !isLoaded}
            >
              Valider
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};

export default SignUpForm;
