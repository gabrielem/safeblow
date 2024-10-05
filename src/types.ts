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
  
  export type { 
    FormProps,
    IwhistleType,
    IdentityFormProps,
    WhistleFormProps,
    IWhistleForm,
    
}