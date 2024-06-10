import { Card, Flex, Strong, Text } from "@radix-ui/themes";
import React from "react";
import portrait from "../assets/portrait.jpg";
const About: React.FC = () => {
  return (
    <>
      <Flex justify="between">
        <Flex direction="column" align="center" gap="4">
          <Strong> William Sinclair Scott - </Strong>
          <Card>
            <Text>
              We are in an age where everyone has to use websites for some facet
              of their proffesional life. I want to make products that arn't the
              ones that customers hate to, but have to, use.
            </Text>
          </Card>
          <Text>
            William has always been a creative. He played the piano and violin
            through highschool, dropping them both his junior year as his
            swimming carreer took flight. He swam for the University of Iowa
            where he also obtained a degree in Computer Science. He also spent
            all of his additional hours taking Creative Writing classes as well
            as classes in the creative fields such as Japanese papermaking.
          </Text>
        </Flex>
        <Flex direction="column" justify="center" align="center">
          <img width="50%" src={portrait} alt="William Sinclair Scott" />
        </Flex>
      </Flex>
    </>
  );
};

export default About;
