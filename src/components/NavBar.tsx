import { Flex, Strong, TabNav, Text } from "@radix-ui/themes";
import React from "react";

const NavBar: React.FC = () => {
  return (
    <TabNav.Root>
      <TabNav.Link href="/">Home</TabNav.Link>
      <TabNav.Link href="/about">About</TabNav.Link>
      <TabNav.Link href="/contact">Contact</TabNav.Link>
      <Flex align="center" justify="center">
        <Text>
          <Strong>William Scott</Strong>, software engineer/website developer{" "}
        </Text>
      </Flex>
    </TabNav.Root>
  );
};

export default NavBar;
