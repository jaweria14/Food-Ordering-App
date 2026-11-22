
import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/MyUserApi";


type Props = {
  children: React.ReactNode;
};
   
const Auth0ProviderWithNavigate = ({ children }: Props) => {

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience =import.meta.env.VITE_AUTH0_AUDIENCE

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("Unable to initialize Auth0");
  }

  const onRedirectCallback = (appState?: {
    returnTo?: string;
  }) => {
   
    window.history.replaceState(
      {},
      document.title,
      appState?.returnTo || window.location.pathname
    );
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
         audience: audience,
       
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <CreateUserAfterLogin />
      {children}
    </Auth0Provider>
  );
};


const CreateUserAfterLogin = () => {
  const { isAuthenticated, user } = useAuth0();
  const { createUser } = useCreateMyUser();

  React.useEffect(() => {
    const saveUser = async () => {
      if (!isAuthenticated || !user?.sub || !user?.email) {
        return;
      }

      const userData = {
        auth0Id: user.sub,
        email: user.email,
        name: user.name || "",
      };

      console.log("Authenticated user:", userData);

      try {
        const response = await createUser(userData);

        console.log("User saved:", response);
      } catch (error) {
        console.error("Failed to save user:", error);
      }
    };

    saveUser();
  }, [isAuthenticated, user, createUser]);

  return null;
};


export default Auth0ProviderWithNavigate;
