import gql from "graphql-tag";
export const ManagerDetail_Frag = gql`
  fragment ManagerDetail_Fragment on Business {
    id
    name
    managerPrice
    managerName
  }
`;
