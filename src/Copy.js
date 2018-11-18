import React from "react";
import styled from "styled-components";

import {
    Hero,
    Container,
    Title,
    SubTitle,
    Content,
    Section,
    Button
} from "reactbulma";

import { Consumer } from "./Context";

const Wrapper = styled.div`
    background-color: #ffc600;
    background-image: linear-gradient(45deg, #ffc600 17%, #faef5e 75%);
    text-align: center;
    height: 100%;
    margin: 0;

    .title {
        font-size: 80px;
        font-weight: 900;
    }
    .subtitle {
        font-weight: 700;
    }
    strong {
        color: #fff;
        background-color: red;
        padding: 0.2rem;
    }
    @media (max-width: 940px) {
        .title {
            font-size: 60px;
        }
    }
`;
const WrapperFooter = styled.div`
    background-color: #363636;
    color: #fff;
    text-align: center;
    height: 100%;
    margin: 0;
`;

export const MyHero = () => (
    <Hero>
        <Wrapper>
            <Hero.Body>
                <Container>
                    <Title>
                        Build Better Newsletters <br />
                        <span role="img" aria-label="mailheart">
                            💌
                        </span>
                    </Title>
                    <SubTitle>
                        A{" "}
                        <a
                            href="https://24hrstartup.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <strong>#24hrstartup</strong>
                        </a>{" "}
                        that helps you build better technical newsletters.{" "}
                        <br />
                        Write markdown, get newsletter.{" "}
                        <span role="img" aria-label="face">
                            🧙‍
                        </span>
                        <br />
                        <br />
                        <span role="img" aria-label="face">
                            🐦
                        </span>{" "}
                        Tweets,{" "}
                        <span role="img" aria-label="face">
                            📹
                        </span>{" "}
                        YouTube,{" "}
                        <span role="img" aria-label="face">
                            🎨
                        </span>{" "}
                        images, and{" "}
                        <span role="img" aria-label="face">
                            🤖
                        </span>{" "}
                        code turn into thumbnails. <br />
                        Save 15+ minutes per newsletter{" "}
                        <span role="img" aria-label="face">
                            🤘
                        </span>
                    </SubTitle>
                    <Consumer>
                        {({ tryExample }) => (
                            <Button large primary onClick={tryExample}>
                                Try example{" "}
                                <span role="img" aria-label="face">
                                    ✍
                                </span>
                            </Button>
                        )}
                    </Consumer>
                </Container>
            </Hero.Body>
        </Wrapper>
    </Hero>
);

export const Footer = () => (
    <WrapperFooter>
        <Section>
            <Content style={{ flexGrow: 3 }}>
                ↔ markdown left, result right
                <br />
                ⌨ live rendering as you type <br />
                🐦 tweets turn into linked screenshots
                <br />
                <span role="img" aria-label="tv">
                    📻
                </span>{" "}
                videos turn into linked screenshots
                <br />
                <span role="img" aria-label="box">
                    🖼
                </span>
                images get smallified and optimized
                <br />
                <span role="img" aria-label="lever">
                    🏗
                </span>
                code blocks turn into carbon.now.sh
                <br />
                <span role="img" aria-label="beach">
                    🏖
                </span>{" "}
                codesandboxes turn into screenshots
            </Content>
            <Content>
                <a href="https://24hrstartup.com">#24hrstartup</a> by{" "}
                <a href="https://swizec.com">Swizec</a>{" "}
                <span role="img" aria-label="heart">
                    ❤️
                </span>
            </Content>
        </Section>
    </WrapperFooter>
);

export default { Hero: MyHero, Footer };
