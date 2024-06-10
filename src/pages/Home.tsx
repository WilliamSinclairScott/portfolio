import {
  Flex,
  Text,
  Card,
  Button,
  Link,
} from "@radix-ui/themes";
import React from "react";
const Home: React.FC = () => {
  return (
    <Flex
      direction="column"
      justify='center'
      align="center"
      gap='4'
      style={{ maxWidth: "800px", margin: "auto"}}
    >
      <Text>Welcome to my portfolio website!</Text>
      <Card>
        <Flex direction="column" align="center">
          <Text>
            The first project I worked on was a website for a local business. I
            used HTML, CSS, and PHP in WordPress to refactor the site and make
            it more user-friendly.
          </Text>
          <Button variant='outline'>
            <Link href="https://thebrooklynstrategist.com/">
              The Brooklyn Strategist
            </Link>
          </Button>
        </Flex>
      </Card>
      <Card>
        <Flex direction="column" align="center">
          <Text>
            I've also collaborated with a team of developers on a project called
            Divvy. It is a full-stack MERN application designed to help friends
            split expenses after a night out.
          </Text>
          <Button variant='outline'>
            <Link href="https://github.com/WilliamSinclairScott/Frontend-Dutch-by-Wahgee">
              Divvy Repository
            </Link>
          </Button>
        </Flex>
      </Card>
      <Card>
        <Flex direction="column" align="center">
          <Text>
            I consulted with a local business to develop a website for their new
            afterschool program and assist with their website layout.
          </Text>
          <Button variant='outline'>
            <Link href="https://nextmovecafe.com/">Next Move Cafe</Link>
          </Button>
        </Flex>
      </Card>
      <Card>
        <Flex direction="column" align="center">
          <Text>
            I led the development of a TypeScript + Django project called
            Chrysalis while attending General Assembly. It is a full-stack
            application designed to help freelancers manage their projects.
          </Text>
          <Button variant='outline'>
            <Link href="https://github.com/Chrysalis-ServiceDistribution">
              Chrysalis Repository
            </Link>
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Home;
