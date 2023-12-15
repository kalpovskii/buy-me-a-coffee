import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import abi from "../utils/abi/BuyMeACoffee.json";
import { useEffect, useState } from "react";
import { useContractWrite, useContractRead } from "wagmi";
import { parseEther } from "viem";
import { MemoComponent } from "../components/MemoComponent/index";
import {
  Input,
  Button,
  Card,
  CardBody,
  Chip,
  Spinner,
  Link,
  Divider,
} from "@nextui-org/react";

interface Memo {
  from: string;
  timestamp: bigint;
  name: string;
  message: string;
}

const CONTRACT_ADDRESS = "0x99f9065Ecc233581533183CA2D3165447ab82704";
const CONTRACT_ABI = abi.abi;

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [supplyData, setSupplyData] = useState<Memo[]>([]);

  const { isLoading, isError, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "buyCoffee",
  });

  const { data } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getMemos",
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      setSupplyData(data);
    }
  }, [data]);

  const handleButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const result = await write({
        args: [name, message],
        value: parseEther("0.001"),
      });
      return result;
    } catch (error) {
      throw new Error("Transaction failed");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Buy me a Сoffee</title>
        <meta
          content="Buy Me a Coffee on Sepolia is a decentralized tipping platform where
          users can send a small contribution of 0.001 sETH"
          name="description"
        />
        <link href="/coffee.png" rel="icon" type="image/png" />
      </Head>
      <main className={styles.main}>
        <h1 className="font-bold text-lg mb-3">By me a Coffee</h1>
        <p className="max-w-md mb-2 text-justify">
          Buy Me a Coffee on Sepolia is a decentralized tipping platform where
          users can send a small contribution of 0.001 sETH (Sepolia Ethereum)
          to show appreciation or support to content creators. <br /> The
          process is simple — users enter their desired contribution, along with
          their name and a personalized message. The sender&apos;s name and
          message are then displayed in a list, creating a public acknowledgment
          of the support received.
        </p>
        <Link
          isExternal
          className="mb-10"
          isBlock
          showAnchorIcon
          href="#"
          color="foreground"
        >
          See on Github
        </Link>
        <Divider className="mb-10 max-w-[450px]" />
        <ConnectButton />
        <form>
          <Card className="my-6 min-w-[440px]">
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Input
                label="Message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <Button
                className="font-medium"
                onClick={handleButtonClick}
                color="primary"
              >
                Send 0.001 sETH
              </Button>
            </CardBody>
          </Card>
        </form>

        {isError && (
          <Chip color="danger" radius="sm">
            An error has occurred. Try again!
          </Chip>
        )}
        {isSuccess && (
          <Chip color="success" radius="sm">
            Transaction is succeed!
          </Chip>
        )}
        {isLoading && <Spinner />}

        <MemoComponent memos={supplyData} />
      </main>

      {/* TODO: create footer component */}
      <footer className={styles.footer}>
        <h2 className="mb-3 text-semibold">Key Technologies:</h2>
        <div className="flex gap-2">
          <Link
            isExternal
            isBlock
            showAnchorIcon
            href="https://nextui.org/docs"
            color="foreground"
          >
            NextUI
          </Link>
          <Link
            isExternal
            isBlock
            showAnchorIcon
            href="https://app.infura.io/"
            color="foreground"
          >
            Infura
          </Link>
          <Link
            isExternal
            isBlock
            showAnchorIcon
            href="https://hardhat.org/"
            color="foreground"
          >
            Hardhat
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
