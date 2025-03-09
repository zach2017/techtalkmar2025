import { authHandler } from "encore.dev/auth";
import { Header, Gateway } from "encore.dev/api";

// The request information our auth handler is interested in is the `Authorization` header.
interface AuthParams {
  authorization: Header<"Authorization">;
}

// Our auth handler will make the `userID` available to endpoints.
interface AuthData {
  userID: string;
}

export const auth = authHandler<AuthParams, AuthData>(async (params) => {
    if (!params || !params.authorization) {
        throw new Error("Authorization parameter is missing.");
      }
    
      // TODO: Look up information about the user based on the authorization header.
      const authorizationHeader = params.authorization;
      // Example: Basic Auth parsing (replace with your actual logic)
      try{
     
          
     console.log(params.authorization.split(":")[1])
      } catch (err){
        throw new Error("Invalid Authorization Header");
      }
  return { userID: "my-user-id" };
});

export const gateway = new Gateway({
  authHandler: auth,
});