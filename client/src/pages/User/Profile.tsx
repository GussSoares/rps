import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/AuthProvider";
import { IEditUser } from "@/hooks/types";
import { editUserRequest } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z, ZodObject, ZodRawShape } from "zod";

const userSchema = z.object({
  firstName: z.string().min(7, "Must be greater 7 characters").describe("First name||Gustavo").optional(),
  lastName: z.string().describe("Last name||Soares").optional(),
  email: z.string().email().describe("Email||gustavo@gmail.com").optional(),
  phone: z.string().describe("Phone||85985050537").optional(),
  gender: z.string().describe("Gender||Male").optional(),
  country: z.string().describe("Country||Brazil").optional(),
  city: z.string().describe("City||Fortaleza").optional(),
  state: z.string().describe("State||Ceará").optional()
});

type editUserFormData = z.infer<typeof userSchema>

export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const fields = Object.entries((userSchema as ZodObject<ZodRawShape>).shape)
  const form = useForm<editUserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
      country: user?.country || '',
      city: user?.city || '',
      state: user?.state || '',
    },
  });

  const handlerEditUser = async (formData: any) => {
    const result = userSchema.safeParse(formData)

    if (result.success) {
      try {
        setLoading(true);
        const data = await editUserRequest(result.data as IEditUser);
        setUser(data);
        toast.success("User edited successfully!");
      } catch (err: any) {
        toast.error("Error on edit user!");
      } finally {
        setLoading(false);
      }
    } else {
      console.log(result)
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold">Profile</h1>
      <span className="text-gray-400">Here is where you can change your informations</span>
      <Separator className="my-4" />

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlerEditUser)}>
            <div className="grid w-full items-center gap-4">
              {
                fields.map(([name, schema]) => {
                  const [label, placeholder] = (schema.description || name).split("||");
                  return (
                    <div key={name} className="flex flex-col my-2 w-1/3">
                      <FormField
                        control={form.control}
                        name={name as keyof editUserFormData}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder={placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                })
              }

              {/* <div className="flex flex-col space-y-1.5 w-1/3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="john.wick" {...field} value={user?.first_name} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-1/3">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="john.wick" {...field} value={user?.last_name} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-1/3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="john.wick" {...field} value={user?.email} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
              <div className="">
                <Button disabled={loading} type="submit">
                  {loading && <Loader2 className="animate-spin" />} Save
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}