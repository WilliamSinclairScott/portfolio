import { useState, useEffect } from "react";
import { Box, Flex, Text, Popover, IconButton } from "@radix-ui/themes";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import War from "../../components/war/War";
import "./Home.css";

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
    let typingTimeout: NodeJS.Timeout;

    const typeText = (
      text: string,
      setText: React.Dispatch<React.SetStateAction<string>>,
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
    }, 1000 + totalTypingTime + 500 + totalSubtitleTime + 1000); // Reduced delay

    const descriptionReplaceTimeout = setTimeout(() => {
      setActualDescription(realDescription);
    }, 1000 + totalTypingTime + 500 + totalSubtitleTime + 1500); // Reduced delay

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
    <Box className="portfolio-section">
      <War />
      <Flex
        direction={{ "lg": "row", "md": "column", "sm": "column", "xs": "column" }}
        align="center"
        justify="center"
        gap="8"
        className="content-wrapper"
      >
        <Flex direction="column" align="center" gap="4" className="text-box">
          <Text size="7" align="center" className="intro-text">
        {typedText}
        {cursorVisible && cursorPosition === "firstLine" && (
          <span className="cursor typing">|</span>
        )}
          </Text>
          <Text size="5" className="subtitle">
        {subtitle}
        {cursorVisible && cursorPosition === "secondLine" && (
          <span className="cursor">|</span>
        )}
          </Text>
          <pre
        className={`intro-description code-block ${
          highlightedDescription ? "highlighted" : ""
        }`}
          >
        <Text size="4" align="center">
          {actualDescription}
        </Text>
          </pre>
          {iconsVisible && (
        <Flex
          direction="row"
          gap="4"
          className={`social-icons ${iconsVisible ? "visible" : ""}`} // Apply the visible class
        >
          <a
            href="https://www.linkedin.com/in/william-scott-8521bb197/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInLogoIcon className="social-icon" />
          </a>
          <Popover.Root>
            <Popover.Trigger>
          <IconButton>
            <EnvelopeClosedIcon />
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
          <a
            href="https://github.com/WilliamSinclairScott"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon className="social-icon" />
          </a>
        </Flex>
          )}
        </Flex>
        <Box className="image-box">
          <img
        src="/portrait.jpg"
        alt="William Scott"
        className="profile-photo"
          />
        </Box>
      </Flex>
    </Box>
  );
}
