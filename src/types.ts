import { Auth, User, UserCredential } from 'firebase/auth'
import { NextApiRequest } from 'next';


type IwhistleType = 'anonymous' | 'not_anonymous';

interface FormProps {
    params: {
      whistleType: IwhistleType
    };
  }

  interface IdentityFormProps {
    whistleType: IwhistleType;
  }

  interface WhistleFormProps {
    // identityPayload?: {
    //     organization: string;
    //     name: string;
    //     surname: string;
    //     email: string;
    //     tlsCertificate?: object;
    // };
    handleFormDataChange: (e: any) => void;
  }

  
  interface requestTlsVerifyResult {
    schemaId: string
    data: Record<string, string> | undefined
  }
 
  interface FirebaseConfig {
    apiKey: string | undefined;
    authDomain: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
    databaseURL: string | undefined;
  }

interface AxiosRequestParams {
  method: 'post' | 'get' | 'put' | 'delete';
  url: string;
  payload?: any;
  token?: string | null;
}

interface IFormLogin {
  email: string
  password: string
}

interface AuthContextProps {
  isAdmin: boolean
  user: User | null
  auth: Auth | null
  getToken: () => Promise<string>
  loading: boolean
  logout: () => Promise<void>
  token: string | null;
  signin: (payload: IFormLogin) => Promise<UserCredential>
  forgotPass: (payload: { email: string }) => Promise<void>
}

interface ExtendedNextApiRequest extends NextApiRequest {
  originalUrl?: string
  isAdmin?: boolean
  ip?: string
  authId?: string
  uid?: string
  userFirebase?: any
  user?: any
}


  export type { 
    FormProps,
    IwhistleType,
    IdentityFormProps,
    WhistleFormProps,
    requestTlsVerifyResult,
    FirebaseConfig, 
    AxiosRequestParams,
    IFormLogin,
    AuthContextProps,
    ExtendedNextApiRequest
}