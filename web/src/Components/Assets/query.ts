import gql from "graphql-tag";
import { BusinessDetail_Frag } from "../Business/query";
export const AssetDetail_Frag = gql`
  fragment AssetDetail_Fragment on Asset {
    id
    count
    price
    profit
    profitDuration
    level
    levelMaxCount
    totalCount
    lastUseStartedAt
    managedAuto
    business {
      id
      ...BusinessDetail_Fragment
      managerPrice
    }
  }
  ${BusinessDetail_Frag}
`;
