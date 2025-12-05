import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../providers/UserProvider";

export function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <Label htmlFor="displayName">Name</Label>
            <Input id="displayName" defaultValue={user.displayName || ""} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={user.email || ""} disabled />
          </div>
          <Button>Update Profile</Button>
        </div>
      </div>
    </div>
  );
}
