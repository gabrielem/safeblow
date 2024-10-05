type IwhistleType = 'anonymous' | 'not_anonymous';

interface FormProps {
    params: {
      whistleType: IwhistleType
    };
  }

  interface IdentityFormProps {
    whistleType: IwhistleType;
  }
  
  export type { 
    FormProps,
    IwhistleType,
    IdentityFormProps
}