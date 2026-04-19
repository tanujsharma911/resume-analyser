import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  // FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth.api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/store/user.store";

const Login = () => {
  const navigate = useNavigate();

  const { setUserData } = useUserStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginRequest = useMutation({
    mutationFn: () => loginUser({ username, password }),
    onSuccess: (data) => {
      if (data?.status === 200 && data?.data?.user) {
        setUserData({
          isLoggedIn: true,
          username: data.data.user.username,
          displayName: data.data.user.displayName,
        });
        navigate("/");
      }
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    if (!username || !password) {
      return;
    }

    e.preventDefault();
    sendLoginRequest.mutate();
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8">
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <img
                      src="./logo.jpeg"
                      alt="Logo"
                      width={50}
                      className="rounded-full"
                    />
                    <br />
                    <h1 className="text-2xl font-bold">Login</h1>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="email">Username</FieldLabel>
                    <Input
                      id="email"
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      {/* <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </a> */}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <Button
                      type="submit"
                      onClick={handleLogin}
                      disabled={sendLoginRequest.isPending}
                    >
                      {sendLoginRequest.isPending && (
                        <Spinner data-icon="inline-start" />
                      )}
                      Login
                    </Button>
                  </Field>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <a href="#">Sign up</a>
                  </FieldDescription>
                </FieldGroup>
              </form>
              <div className="relative hidden bg-muted md:block">
                <img
                  src="./bg.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
};

export default Login;
