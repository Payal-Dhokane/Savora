import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {session ? (
        <Dashboard session={session} />
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
