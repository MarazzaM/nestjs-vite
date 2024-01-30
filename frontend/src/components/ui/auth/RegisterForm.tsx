import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  name: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});


type RegisterFormProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export function RegisterForm({ setLogin }: RegisterFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name:"",
      password: "",
    },
  });
  const { formState } = form; // Extract formState from form

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const  backend = import.meta.env.VITE_BACKEND
    try {
      const response = await fetch(backend + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful register here, if needed
      console.log("Register successful!");
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
        text: "Redirecting to login...",
      });

      form.reset();

      setTimeout(() => {
        setLogin(true);
      }, 2000);

    } catch (error) {
      // Handle errors during register
      console.error("Register error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input 
                 required
                 className="text-gray-700"
                placeholder="Ryan Ross" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                 autoComplete="email"
                 required
                 className="text-gray-700"
                placeholder="panic@thedis.co" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                type="password"
                required
                className="text-gray-700"
                placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Dont share your password with anyone!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
