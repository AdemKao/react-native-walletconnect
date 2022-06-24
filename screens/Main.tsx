import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Navigation from "../types";
// import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useWalletConnect } from "../WalletConnect";
import { useMoralis, useChain } from "react-moralis";
// import { enableMoralisViaWalletConnect } from "../enableMoralisViaMoralis";
import { useEffect, useState } from "react";

export default function Main({ navigation }: any) {
  const { web3, Moralis, user, authenticate, authError, isAuthenticated } = useMoralis();
  const connector = useWalletConnect();
  // (Moralis as any).enableWeb3();
  const { switchNetwork, chainId } = useChain();
  var txt;
  for (let x in connector) {
    console.log(connector[x]);
    txt += connector[x] + " ";
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textContent}>Current chainId: {chainId} </Text> */}
      <Text style={styles.textContent}>!! {connector.chainId} </Text>
      <Text style={styles.textContent}>This is the Main {JSON.stringify(user)} </Text>
      <Button
        onPress={() => {
          (navigation as Navigation).navigate("Second Page");
        }}
        title="Go to Second Page"
      />
      <Button
        onPress={async () => {
          // connector.updateChain
          // await connector.updateChain({
          //   chainId: 4,
          //   networkId: 4,
          //   rpcUrl: "https://speedy-nodes-nyc.moralis.io/017d656734a8835682e12397/eth/rinkeby",
          //   nativeCurrency: {
          //     name: "ETH",
          //     symbol: "ETH",
          //   },
          // });
          // switchNetwork("0x61").then(
          //   () => {
          //     setChain("0x61");
          //   },
          //   () => {
          //     console.log("Fail to swtich chain");
          //   }
          // );
        }}
        title="SWITCH"
      />
      <Button
        onPress={() => {
          //@ts-ignore
          connector.chainId = 4;
          authenticate({ connector })
            .then(() => {
              if (authError) {
                console.log(authError.message);
              } else {
                if (isAuthenticated) {
                  console.log("LO");
                  // switchNetwork("0x04");
                }
              }
            })
            .catch(() => {});
        }}
        title="CONNECT"
      />
      <Button
        onPress={async () => {
          // connector.sendTransaction({
          //   from: connector.accounts[0],
          //   to: "0x3a339C136F4482f348e3921EDBa8b8Ebd6931f08",
          //   value: "10000000000000000"
          // })
        }}
        title="SEND"
      />
      <Button
        onPress={() => {
          connector.killSession();
        }}
        title="DISCONNECT"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textContent: {
    fontFamily: "bank-gothic-light",
  },
});
