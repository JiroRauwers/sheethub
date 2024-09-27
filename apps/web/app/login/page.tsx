import { signIn } from "~/auth";
import { LoginForm } from "~/components/login-form";

export default function Page() {
  return (
    <form
      className="flex h-screen w-full items-center justify-center px-4"
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <LoginForm />
    </form>
  );
}
