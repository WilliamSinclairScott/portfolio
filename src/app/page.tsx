// src/app/page.tsx
"use client";

import {
  Box,
  Flex,
  Text,
  Popover,
  Card,
  IconButton,
  Link,
} from "@radix-ui/themes";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  GearIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import War from "../components/War";
import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [highlightedDescription, setHighlightedDescription] = useState(false);
  const [actualDescription, setActualDescription] = useState(
    `//TODO - Replace this with actual description
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias nesciunt hic sint eos magni, assumenda, ullam cumque libero culpa deserunt, reprehenderit minus accusantium eveniet ipsam?
    `
  );
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState("firstLine");
  const [iconsVisible, setIconsVisible] = useState(false);

  const fullText = "William Scott";
  const fullSubtitle = "Software Engineer";
  const realDescription = `I build modern happy-to-be-used, high-performance web applications using Typescript, React Frameworks, and whatever Saas is needed. Give me a call if you're interested, email if you have other work to do first `;

  useEffect(() => {
    let typingTimeout: string | number | NodeJS.Timeout | undefined;

    const typeText = (
      text: string,
      setText: (value: SetStateAction<string>) => void,
      delay = 50,
      index = 0
    ) => {
      if (index < text.length) {
        setText((prev) => prev + text.charAt(index));
        typingTimeout = setTimeout(
          () => typeText(text, setText, delay, index + 1),
          delay
        );
      }
    };

    const totalTypingTime = fullText.length * 50;
    const totalSubtitleTime = fullSubtitle.length * 50;

    typingTimeout = setTimeout(() => {
      typeText(fullText, setTypedText);
    }, 1000);

    const subtitleTimeout = setTimeout(() => {
      setCursorPosition("secondLine");
      typeText(fullSubtitle, setSubtitle);
    }, 1000 + totalTypingTime + 500);

    const cursorTimeout = setTimeout(() => {
      setCursorVisible(false);
    }, 1000 + totalTypingTime + 500 + totalSubtitleTime + 1000);

    const descriptionTimeout = setTimeout(() => {
      setHighlightedDescription(true);
    }, 1000 + totalTypingTime + 500 + totalSubtitleTime + 1000);

    const descriptionReplaceTimeout = setTimeout(() => {
      setActualDescription(realDescription);
    }, 1000 + totalTypingTime + 500 + totalSubtitleTime + 1500);

    const removeHighlightTimeout = setTimeout(() => {
      setHighlightedDescription(false);
    }, 1000 + totalTypingTime + 500 + totalSubtitleTime + 3000);

    const iconsTimeout = setTimeout(() => {
      setIconsVisible(true);
    }, 1000 + totalTypingTime + 500 + totalSubtitleTime + 3500);

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(subtitleTimeout);
      clearTimeout(descriptionTimeout);
      clearTimeout(descriptionReplaceTimeout);
      clearTimeout(removeHighlightTimeout);
      clearTimeout(cursorTimeout);
      clearTimeout(iconsTimeout);
    };
  }, [realDescription]);

  return (
    <Box className="flex justify-center items-center h-screen">
      <War />
      <Flex
        direction={{ lg: "row", md: "column", sm: "column", xs: "column" }}
        align="center"
        justify="center"
        gap="8"
        className="w-full h-full flex justify-between px-8"
      >
        <Flex
          direction="column"
          align="center"
          gap="4"
          className="max-w-[33%] flex-1 text-black flex flex-col justify-center items-start opacity-80"
        >
          <Text
            size="7"
            align="center"
            className="text-[3.5rem] font-bold text-white"
          >
            {typedText}
            {cursorVisible && cursorPosition === "firstLine" && (
              <span className="inline-block ml-[2px] w-[1px] animate-blink typing">
                |
              </span>
            )}
          </Text>
          <Text size="5" className="text-[1.8rem] text-gray-500 mt-2">
            {subtitle}
            {cursorVisible && cursorPosition === "secondLine" && (
              <span className="inline-block ml-[2px] w-[1px] animate-blink">
                |
              </span>
            )}
          </Text>
          <pre
            className={`text-[1.2rem] text-[#737373] leading-[1.6] max-w-full mt-4 whitespace-pre-wrap ${
              highlightedDescription
                ? "bg-[#808080] text-white p-[0.3rem] transition-colors duration-500 ease-in-out"
                : ""
            } font-mono bg-[#f5f5f5] text-black p-4 border-2 border-[#808080] rounded-[4px] shadow-md w-full overflow-x-auto`}
          >
            <Text size="4" align="center">
              {actualDescription}
            </Text>
          </pre>
            {iconsVisible && (
            <Flex
              direction="row"
              gap="4"
              className={`transition-opacity duration-1000 ease-in-out ${iconsVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <Link
              href="https://www.linkedin.com/in/william-scott-8521bb197/"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                borderRadius: "",
              }}
              >
              <IconButton
                size={"4"}
                style={{ backgroundColor: "white", color: "black" }}
              >
                <LinkedInLogoIcon width={"32"} height={"30"} />
              </IconButton>
              </Link>
              <Popover.Root>
              <Popover.Trigger>
                <IconButton
                size={"3"}
                style={{ backgroundColor: "white", color: "black" }}
                >
                <EnvelopeClosedIcon width={"18"} height={"18"} />
                </IconButton>
              </Popover.Trigger>
              <Popover.Content sideOffset={5} align="center">
                <Flex direction="column" gap="2" className="popover-text">
                <Text size="2">Phone: +1 (319) 855 3580</Text>
                <Text size="2">
                  Email:{" "}
                  <a
                  href="mailto:william.sinclair.scott@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  william.sinclair.scott@gmail.com
                  </a>
                </Text>
                </Flex>
              </Popover.Content>
              </Popover.Root>
              <Link
              href="https://github.com/WilliamSinclairScott"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                borderRadius: "",
              }}
              >
              <IconButton
                size={"4"}
                style={{ backgroundColor: "white", color: "black" }}
              >
                <GitHubLogoIcon width={"32"} height={"30"} />
              </IconButton>
              </Link>
            </Flex>
            )}
        </Flex>
        <Flex
          gap="4"
          direction={"column"}
          className={iconsVisible ? "fade-in" : ""}
          style={{ visibility: iconsVisible ? "visible" : "hidden" }}
        >
          <Box maxWidth={"420px"} minWidth={"410px"}>
            <Card>
              <Flex direction="column" align="center" justify="center">
                <Text as="div" size="2" weight="bold">
                  Building out custom ecommerce platform..
                </Text>
                <Text as="div" size="2" color="gray">
                  <Flex align="center" gap="2">
                    <GearIcon width={"18"} height={"18"} />
                    <Text as="div" size="2" color="gray">
                      Under construction
                    </Text>
                    <GearIcon width={"18"} height={"18"} />
                  </Flex>
                </Text>
              </Flex>
            </Card>
          </Box>
          <Box maxWidth={"420px"} minWidth={"410px"}>
            <Card>
              <Flex direction="column" align="center" justify="center">
                <Text as="div" size="2" weight="bold">
                  Came accross this cool start up and decided to help out!
                </Text>
                <Text as="div" size="2" color="gray">
                  <Flex align="center" gap="2">
                    <Image
                      src="/cookd.png"
                      alt="Cookd Logo"
                      width={24}
                      height={24}
                    />
                    <Text as="div" size="2" color="gray">
                      <a
                        href="https://cookd.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        If you are in HR you should check this out
                      </a>
                    </Text>
                    <Image
                      src="/cookd.png"
                      alt="Cookd Logo"
                      width={24}
                      height={24}
                    />
                  </Flex>
                </Text>
              </Flex>
            </Card>
          </Box>
          <Box maxWidth={"420px"} minWidth={"410px"}>
            <Card>
              <Flex direction="column" align="center" justify="center">
                <Text as="div" size="2" weight="bold">
                  I worked here, making the website and backend better so
                  communities have a cool place to meet.
                </Text>
                <Text as="div" size="2" color="gray">
                  <a href="https://thebrooklynstrategist.com/">
                    The Brooklyn Strategist
                  </a>
                </Text>
              </Flex>
            </Card>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
