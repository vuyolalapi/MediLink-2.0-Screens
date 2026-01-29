import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  {Logo}  from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Stethoscope, Truck, HelpCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "doctor" | "emt">("doctor");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

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
  };

  const roleConfig = {
    admin: {
      icon: Shield,
      title: "Administrator",
      description: "System Control & Oversight",
      color: "text-primary",
    },
    doctor: {
      icon: Stethoscope,
      title: "Doctor",
      description: "Clinical & Patient Care",
      color: "text-accent",
    },
    emt: {
      icon: Truck,
      title: "EMT",
      description: "Emergency Response",
      color: "text-urgent",
    },
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
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4">
              <Logo size="lg" />
            </div>
            <CardDescription className="text-accent">
              Connecting you to better care
            </CardDescription>
            <CardTitle className="text-xl mt-4">Staff Portal</CardTitle>
          </CardHeader>

          <CardContent>
   
            <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as typeof selectedRole)} className="mb-6">
              <TabsList className="grid grid-cols-3 w-full">
                {(["admin", "doctor", "emt"] as const).map((role) => {
                  const config = roleConfig[role];
                  const Icon = config.icon;
                  return (
                    <TabsTrigger key={role} value={role} className="flex flex-col gap-1 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{config.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Staff Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="staff@medilink.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-accent/30 focus:border-accent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-accent/30 focus:border-accent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-accent/30" />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">
                  Remember me
                </Label>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                LOG IN
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <button type="button" 
                 onClick={() => navigate('forgot-password')}
                className="text-accent hover:underline">
                  Forgot Password?
                </button>
                {" | "}
                <button type="button"
                onClick={() => navigate('it-support')}
                 className="text-accent hover:underline">

                  Contact IT Support
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-accent/30 bg-card/80 py-4 text-center text-sm text-muted-foreground">
        © 2026 MEDILINK Health Systems. All rights reserved.
      </footer>
    </div>
  );
}
