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
    identityPayload?: {
        organization: string;
        name: string;
        surname: string;
        email: string;
        tlsCertificate?: object;
    };
  }

  interface IWhistleForm {
    whistleMessage: string;
    identity?: any;
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
    IWhistleForm,
    requestTlsVerifyResult,
    
}