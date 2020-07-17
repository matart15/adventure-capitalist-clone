import gql from "graphql-tag";
export const AssetDetail_Frag = gql`
  fragment ManualAssetDetail_Fragment on Asset {
    id
    count
    price
    profit
    level
    levelMaxCount
    totalCount
    profitDuration
    lastUseStartedAt
    managedAuto
    business {
      id
      basePrice
      managerPrice
    }
  }
`;
