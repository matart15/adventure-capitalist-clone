import { AssetDetail_Frag } from "../Assets/query";
import { gql } from "apollo-boost";
import { BusinessDetail_Frag } from "../Business/query";

export const AllBusunesses = gql`
  query AllBusinesses_Query($userId: Int) {
    businesses {
      id
      basePrice
      ...BusinessDetail_Fragment
      managerPrice
    }
    user(where: { id: $userId }) {
      id
      money
      lastUpdated
      assets {
        ...AssetDetail_Fragment
      }
    }
  }
  ${AssetDetail_Frag}
  ${BusinessDetail_Frag}
`;

export const UserMoney_Frag = gql`
  fragment UserMoney_Fragment on User {
    id
    money
  }
`;
