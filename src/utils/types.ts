export type ArrayElementType<T> = T extends Array<infer U> ? U : never;
export enum ValidationMethod {
  Email = 'Email',
  Phone = 'Phone'
}

export enum IFundType {
  Public = 1,
  Private
}
