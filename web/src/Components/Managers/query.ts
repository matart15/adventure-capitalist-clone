import { AssetDetail_Frag } from "../Assets/query";
import { gql } from "apollo-boost";
import { ManagerDetail_Frag } from "../Manager/query";
import { UserMoney_Frag } from "../Game/query";

export const AllBusunessesWithManager = gql`
  query AllBusinessesWithManager_Query($userId: Int) {
    businesses {
      id
      basePrice
      ...ManagerDetail_Fragment
      managerPrice
    }
    user(where: { id: $userId }) {
      id
      money
      lastUpdated
      ...UserMoney_Fragment
      assets {
        ...AssetDetail_Fragment
      }
    }
  }
  ${UserMoney_Frag}
  ${AssetDetail_Frag}
  ${ManagerDetail_Frag}
`;
