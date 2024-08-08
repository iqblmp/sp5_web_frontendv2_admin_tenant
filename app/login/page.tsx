"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { setCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"
import { AlertCircle, CircleCheckBig, Info, Terminal } from "lucide-react"
import { useForm } from "react-hook-form"
import { string, z } from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
})

const LoginPage: React.FC = () => {
  const router = useRouter()

  type AlertType = "success" | "error" | "info" | "warning" | "default"

  type Alert = {
    type: AlertType
    message: string
  }
  type JwtPayload = {
    data: {
      user: {
        name: string
      }
    }
  }
  const [dataAlert, setDataAlert] = useState<Alert>({
    type: "default",
    message: "",
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return string
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const iconMap = {
    success: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    ),
    error: <AlertCircle className="h-4 w-4" />,
    warning: <AlertCircle className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
    default: <Terminal className="h-4 w-4" />,
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setLoadingSubmit(true)
    axios
      .post(`${process.env.API_URL}/user/login`, values)
      .then((res) => {
        const token = res.data.data.token
        const decoded: JwtPayload = jwtDecode(token)
        setDataAlert({
          type: "success",
          message: `Welcome, ${decoded.data.user.name}`,
        })
        setShowAlert(true)
        setCookie("jwt", token)
        setTimeout(() => router.push("/"), 2000)
      })
      .catch((err) => {
        const status = err.response.status
        if (status === 401) {
          setDataAlert({
            type: "error",
            message:
              "Your Username or Password is incorrect. Please try again.",
          })
        } else {
          setDataAlert({
            type: "error",
            message: "Error server response.",
          })
        }
        setShowAlert(true)
        setLoadingSubmit(false)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-full min-h-screen justify-center items-center bg-gradient-to-bl from-gray-50 dark:from-gray-950 via-gray-100 dark:via-gray-900 to-gray-200  dark:to-gray-800">
          <Card className="w-full max-w-sm ">
            <CardHeader className="w-full pt-5 pb-1">
              <CardTitle className="flex w-full justify-center">
                <img width={250} src="/asi-logo.png" alt="" />
              </CardTitle>
              {showAlert && (
                <div className="pb-3">
                  <Alert variant={dataAlert.type}>
                    {iconMap[dataAlert.type] || iconMap.default}
                    <AlertTitle>
                      {capitalizeFirstLetter(dataAlert.type)}!
                    </AlertTitle>
                    <AlertDescription>{dataAlert.message}</AlertDescription>
                  </Alert>
                </div>
              )}
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
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
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="mt-4 text-center text-xs">
                Powered by ASI Asia Pacific
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  )
}
export default LoginPage
