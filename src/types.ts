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
  
  export type { 
    FormProps,
    IwhistleType,
    IdentityFormProps,
    WhistleFormProps,
    requestTlsVerifyResult,
    FirebaseConfig, 
}