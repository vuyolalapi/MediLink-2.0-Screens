import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Stethoscope, Truck, HelpCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] =
    useState<"admin" | "doctor" | "emt">("doctor");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // ✅ JWT is now stored automatically by Supabase
    // data.session.access_token

    // OPTIONAL: role check later via database
    switch (selectedRole) {
      case "admin":
        navigate("/admin");
        break;
      case "doctor":
        navigate("/doctor");
        break;
      case "emt":
        navigate("/emt");
        break;
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen medical-gradient flex flex-col">
      <header className="border-b border-accent/30 bg-card/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between py-4">
          <Logo size="md" />
          <Button variant="outline" size="sm" className="gap-2">
            <HelpCircle className="w-4 h-4" />
            Help
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-accent/30 shadow-xl">
          <CardHeader className="text-center">
            <Logo size="lg" className="mx-auto mb-4" />
            <CardDescription className="text-accent">
              Connecting you to better care
            </CardDescription>
            <CardTitle className="text-xl mt-2">Staff Portal</CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs
              value={selectedRole}
              onValueChange={(v) =>
                setSelectedRole(v as "admin" | "doctor" | "emt")
              }
              className="mb-6"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="admin">
                  <Shield className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="doctor">
                  <Stethoscope className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="emt">
                  <Truck className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "LOG IN"}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-accent hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}