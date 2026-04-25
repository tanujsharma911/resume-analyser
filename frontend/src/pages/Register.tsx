import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth.api"; // Ensure this exists
import { useState } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/store/user.store";

const Register = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserStore();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendRegisterRequest = useMutation({
    mutationFn: () => registerUser({ displayName, email, password }),
    onSuccess: (data) => {
      if (data?.status === 201 && data?.data?.user) {
        setUserData({
          isLoggedIn: true,
          email: data.data.user.email,
          displayName: data.data.user.displayName,
        });
        navigate("/");
      }
    },
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) return;
    sendRegisterRequest.mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Card className="overflow-hidden border-none shadow-2xl ring-1 ring-black/5">
          <CardContent className="grid p-0 md:grid-cols-2">
            {/* Left Side: Decorative Image (Swapped for visual variety) */}
            <div className="relative hidden bg-muted md:block">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
              <img
                src="./bg.png" // You can use a different image if preferred
                alt="Community background"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute top-10 left-10 right-10 z-20 text-white">
                <blockquote className="space-y-2">
                  <p className="text-lg font-medium leading-relaxed italic">
                    Join thousands of professionals improving their careers
                    today.
                  </p>
                </blockquote>
              </div>
            </div>

            {/* Right Side: Form */}
            <form
              onSubmit={handleRegister}
              className="p-8 md:p-12 lg:p-16 flex flex-col justify-center"
            >
              <div className="mb-8 flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 p-2 ring-1 ring-primary/20">
                  <img
                    src="./logo.png"
                    alt="Logo"
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    Create Account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Get started with your free resume check
                  </p>
                </div>
              </div>

              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel htmlFor="name" className="font-semibold">
                    Full Name
                  </FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    className="h-11 transition-all focus-visible:ring-2"
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email" className="font-semibold">
                    Email Address
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    className="h-11 transition-all focus-visible:ring-2"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="password"
                    title="Password"
                    className="font-semibold"
                  >
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    className="h-11 transition-all focus-visible:ring-2"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>

                <Button
                  type="submit"
                  className="w-full h-11 text-base font-medium mt-2 transition-transform active:scale-[0.98]"
                  disabled={sendRegisterRequest.isPending}
                >
                  {sendRegisterRequest.isPending ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Creating account...
                    </>
                  ) : (
                    "Get Started"
                  )}
                </Button>

                <div className="mt-2 text-center text-sm">
                  <span className="text-muted-foreground">
                    Already have an account?{" "}
                  </span>
                  <a
                    href="/login"
                    className="font-semibold text-primary hover:underline underline-offset-4"
                  >
                    Sign in
                  </a>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
          <a
            href="#"
            className="underline hover:text-primary transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
