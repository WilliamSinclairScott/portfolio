import { Flex, Text, Strong, RadioGroup, Separator } from "@radix-ui/themes";
import React from "react";
const Home: React.FC = () => {
  const [selected, setSelected] = React.useState("1");
  const handelRadioChange = (e: string) => {
    console.log(typeof e);
    if (e) {
      setSelected(e);
    }
  };
  return (
    <>
      <Flex direction="column" align="center">
        <Strong>William Scott</Strong> <br />
        <Text>Software Engineer </Text> <br />
        <Text>What I've Worked on</Text>
        <RadioGroup.Root
          defaultValue="1"
          name="example"
          onClick={(radioGroup) =>
            handelRadioChange((radioGroup.target as HTMLInputElement)?.value)
          }
        >
          <RadioGroup.Item value="1">Brooklyn Strategist</RadioGroup.Item>
          <RadioGroup.Item value="2">Divvy</RadioGroup.Item>
          <RadioGroup.Item value="3">NextMoveCafe</RadioGroup.Item>
          <RadioGroup.Item value="4">Chrysalis</RadioGroup.Item>
        </RadioGroup.Root>
        <Separator my="1" size="4" />
      {selected === "1" ? (
        <>
          <Text>
            The first project I worked on was a website for a local business. I
            used HTML, CSS, and PHP in WordPress to refactor the site and make
            it more user-friendly. You can see it here!
          </Text>
          <Separator my="1" size="3" />
          <a href="https://thebrooklynstrategist.com">
              The Brooklyn Strategist
            </a>
        </>
      ) : selected === "2" ? (
        <>
          <Text>
            I also collaborated with a team of developers on a project called
            Divvy. It is a full-stack MERN application designed to help friends
            split expenses after a night out. Check out the repository!
          </Text>
          <Separator my="1" size="3" />
          <a href="https://github.com/WilliamSinclairScott/Frontend-Dutch-by-Wahgee">Divvy Repository</a>
        </>
      ) : selected === "3" ? (
        <>
          <Text>
            I consulted with a local business to develop a website for their new afterschool program and assist with their website layout. You can visit below.
          </Text>
          <Separator my="1" size="3" />
          <a href="https://nextmovecafe.com">Next Move Cafe</a>
        </>
      ) : (
        <>
          <Text>
            I led the development of a TypeScript + Django project called
            Chrysalis while attending General Assembly. It is a full-stack application designed to help
            freelancers manage their projects and clients.
          </Text>
          <Separator my="1" size="3" />
          <a href="https://github.com/Chrysalis-ServiceDistribution">Chrysalis Repository</a>
        </>
      )}
      </Flex>
    </>
  );
};

export default Home;
