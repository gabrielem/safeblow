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
  
  
  export type { 
    FormProps,
    IwhistleType,
    IdentityFormProps,
    WhistleFormProps,
    requestTlsVerifyResult,
    
}