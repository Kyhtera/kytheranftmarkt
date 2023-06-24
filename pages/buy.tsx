import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import Filter from "../components/Filter/Filter";
import styles from "../styles/Buy.module.css";

export default function Buy() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string>
  >({
    backgrounds: "",
    body: "",
    code: "",
    eyes: "",
    mouth: "",
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const filterNFTs = (nft: any) => {
    const { attributes } = nft.metadata;
    return (
      (!selectedFilters["backgrounds"] ||
        attributes.find(
          (attr: any) =>
            attr.trait_type === "backgrounds" &&
            attr.value === selectedFilters["backgrounds"]
        )) &&
      (!selectedFilters["body"] ||
        attributes.find(
          (attr: any) =>
            attr.trait_type === "body" && attr.value === selectedFilters["body"]
        )) &&
      (!selectedFilters["code"] ||
        attributes.find(
          (attr: any) =>
            attr.trait_type === "code" && attr.value === selectedFilters["code"]
        )) &&
      (!selectedFilters["eyes"] ||
        attributes.find(
          (attr: any) =>
            attr.trait_type === "eyes" && attr.value === selectedFilters["eyes"]
        )) &&
      (!selectedFilters["mouth"] ||
        attributes.find(
          (attr: any) =>
            attr.trait_type === "mouth" &&
            attr.value === selectedFilters["mouth"]
        ))
    );
  };

  const filteredData = data?.filter(filterNFTs);

  return (
    <Container maxWidth="lg">
      <h1>Buy NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>

      <div className={styles.filters}>
        <Filter
          label="background"
          options={Array.from(
            new Set(
              filteredData?.flatMap((nft: any) =>
                nft.metadata.attributes
                  .filter((attr: any) => attr.trait_type === "backgrounds")
                  .map((attr: any) => attr.value)
              )
            )
          ).sort()}
          value={selectedFilters["backgrounds"]}
          onChange={(value) => handleFilterChange("backgrounds", value)}
        />

        <Filter
          label="code"
          options={Array.from(
            new Set(
              filteredData?.flatMap((nft: any) =>
                nft.metadata.attributes
                  .filter((attr: any) => attr.trait_type === "code")
                  .map((attr: any) => attr.value)
              )
            )
          ).sort()}
          value={selectedFilters["code"]}
          onChange={(value) => handleFilterChange("code", value)}
        />

        <Filter
          label="eyes"
          options={Array.from(
            new Set(
              filteredData?.flatMap((nft: any) =>
                nft.metadata.attributes
                  .filter((attr: any) => attr.trait_type === "eyes")
                  .map((attr: any) => attr.value)
              )
            )
          ).sort()}
          value={selectedFilters["eyes"]}
          onChange={(value) => handleFilterChange("eyes", value)}
        />

        <Filter
          label="mouth"
          options={Array.from(
            new Set(
              filteredData?.flatMap((nft: any) =>
                nft.metadata.attributes
                  .filter((attr: any) => attr.trait_type === "mouth")
                  .map((attr: any) => attr.value)
              )
            )
          ).sort()}
          value={selectedFilters["mouth"]}
          onChange={(value) => handleFilterChange("mouth", value)}
        />
      </div>

      <NFTGrid
        data={filteredData}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
        }
      />
    </Container>
  );
}
