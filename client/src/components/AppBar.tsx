import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { BACKEND_URL } from "../lib/Api";

const DEFAULT_CREDENTIALS = {
  email: "test@gmail.com",
  password: "Test@123",
};

const AppBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(DEFAULT_CREDENTIALS.email);
  const [password, setPassword] = useState(DEFAULT_CREDENTIALS.password);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        setToken(token);
        toast.success("Login Successful", { description: "Welcome back!" });
        setOpen(false);
      }
    } catch (error) {
      toast.error("Login Failed", {
        description: "Invalid credentials. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex justify-between items-center px-6 m-4 py-4 rounded-2xl bg-gray-950 text-white shadow-lg">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        QueryMind
      </h1>

      <div className="flex gap-2">
        {token ? (
          <>
            <Button
              variant="outline"
              className="border-white dark:text-white cursor-pointer text-black hover:bg-gray-700"
              onClick={() => navigate("/query")}
            >
              Try Now
            </Button>
            <Button
              variant="outline"
              className="border-white cursor-pointer dark:text-white text-black hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-white dark:text-white text-black hover:bg-gray-700"
              >
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-gray-900 bg-white dark:text-white text-black p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  Login
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleLogin}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="dark:bg-gray-800 bg-gray-100 dark:text-white text-black"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="dark:bg-gray-800 bg-gray-100 dark:text-white text-black"
                />
                <Button
                  type="submit"
                  className="w-full dark:bg-gray-700 cursor-pointer bg-gray-900 dark:hover:bg-gray-600 hover:bg-gray-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default AppBar;
