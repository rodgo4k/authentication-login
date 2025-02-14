"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useCallback, useRef, useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordAuthInputRef = useRef<HTMLInputElement>(null);

  const [formError, setFormError] = useState("");

  const handleRegisterClick = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormError("");

      const emailReg = new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
      );

      if (
        emailInputRef.current &&
        passwordInputRef.current &&
        passwordAuthInputRef.current
      ) {
        const email = emailInputRef.current.value;
        const pass1 = passwordInputRef.current.value;
        const pass2 = passwordAuthInputRef.current.value;

        if (!emailReg.test(email)) {
          setFormError("Email inválido.");
          return;
        }

        if (pass1.length < 8) {
          setFormError("A senha precisa ter pelo menos 8 caracteres.");
          return;
        }

        if (pass1 !== pass2) {
          setFormError("As senhas não são iguais.");
          return;
        }
      }
    },
    []
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Faça seu cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(event) => handleRegisterClick(event)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Digite seu Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    ref={emailInputRef}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Digite sua senha</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*****"
                    ref={passwordInputRef}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Repita sua senha</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*****"
                    required
                    ref={passwordAuthInputRef}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Cadastrar
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
              {formError && (
                <div className="text-red-600 my-4">
                  <p>{formError}</p>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
