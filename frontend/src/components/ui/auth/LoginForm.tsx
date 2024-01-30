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
import { useStore } from "@/store/store";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { redirect } from "react-router-dom";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});


export function LoginForm() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const navigate = useNavigate(); 

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { formState } = form; // Extract formState from form

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let responseData;
    const  backend = import.meta.env.VITE_BACKEND
    try {
      const response = await fetch(backend + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      responseData = await response.json();

      useStore.getState().startLogin({
        email: responseData.user.email,
        accessToken: responseData.accessToken,
        id:responseData.user.id
      });


      // Handle successful login here, if needed
      setCookie('accessToken', responseData.accessToken)
      
      console.log("Login successful!");
      
      
    } catch (error) {
      // Handle errors during login
      console.error("Login error:", error);
    }
    
    window.location.href = "/chat";
    console.log("Before navigate");
    navigate("/chat");
    console.log("After navigate");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
