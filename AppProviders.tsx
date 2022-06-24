import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import WalletConnectProvider, { WalletConnectProviderProps } from "@walletconnect/react-native-dapp";
import WalletConnectProvider, { WalletConnectProviderProps } from "./WalletConnect";
import { enableViaWalletConnect } from "./enableMoralisViaMoralis";
import { MoralisDappProvider } from "./providers/MoralisDappProvider";
import { Platform } from "react-native";
import { expo } from "./app.json";
const { scheme } = expo;

interface ProvidersProps {
  readonly children: JSX.Element;
}

import { MoralisProvider } from "react-moralis";

import Moralis from "moralis/react-native.js";
Moralis.setAsyncStorage(AsyncStorage);
//@ts-ignore
Moralis.enable = enableViaWalletConnect;
console.log(AsyncStorage.getAllKeys(), "KEYS");

const walletConnectOptions: WalletConnectProviderProps = {
  redirectUrl: Platform.OS === "web" ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"],
  },
  // Uncomment to show a QR-code to connect a wallet
  // renderQrcodeModal: Qrcode,
};

export const AppProviders = ({ children }: ProvidersProps) => {
  const REACT_APP_MORALIS_APPLICATION_ID = "xjB5HoGbMY1n7oGUvUDssTUZH9pcxLK056EBbsS1";
  //   const REACT_APP_MORALIS_SERVER_URL = "https://wqr38xjsqwzy.moralishost.com:2053/server";
  const REACT_APP_MORALIS_SERVER_URL = "https://rmbectdny50c.usemoralis.com:2053/server";
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        // appId={process.env.REACT_APP_MORALIS_APPLICATION_ID!}
        // serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL!}
        appId={REACT_APP_MORALIS_APPLICATION_ID!}
        serverUrl={REACT_APP_MORALIS_SERVER_URL!}
        environment="native"
      >
        <MoralisDappProvider>{children}</MoralisDappProvider>
      </MoralisProvider>
    </WalletConnectProvider>
  );
};
