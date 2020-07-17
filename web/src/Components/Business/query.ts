import gql from "graphql-tag";
export const BusinessDetail_Frag = gql`
  fragment BusinessDetail_Fragment on Business {
    id
    name
    basePrice
  }
`;
