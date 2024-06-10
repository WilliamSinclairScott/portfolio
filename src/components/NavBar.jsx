import React from "react";
import { Flex, Strong, TabNav, Text } from "@radix-ui/themes";
const NavBar = () => {
  return (
    <TabNav.Root>
      <TabNav.Link href="/">
        Home
      </TabNav.Link>
      <TabNav.Link href="/about">About</TabNav.Link>
      <TabNav.Link href="/contact">Contact</TabNav.Link>
      <Flex direction='row-reverse' align='center' justify='center' 
      >
        <Text><Strong>William Scott</Strong>, software engineer </Text>
      </Flex>
    </TabNav.Root>
    );
};

export default NavBar;
