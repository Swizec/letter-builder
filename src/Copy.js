import React from "react";
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

export const MyHero = () => (
    <Hero>
        <Hero.Body>
            <Container>
                <Title>Build better newsletters <span role="img" aria-label='mailheart'>💌</span>
                </Title>
                <SubTitle>
                    A #24hrstartup that helps you build better technical
                    newsletters. Write markdown, get newsletter. <span role="img" aria-label='face'>🧙‍</span>
                </SubTitle>
                <Content>
                    <span role="img" aria-label='face'>✍ </span>markdown left, <span role="img" aria-label='heartmail'>💌 </span>letter result right
                    <br />
                    ⌨ live render as you type <br />
                    <span role="img" aria-label='face'>🏚</span> [urls] change to embeds
                </Content>
                <Consumer>
                    {({ tryExample }) => (
                        <Button large primary onClick={tryExample}>
                            Try example <span role="img" aria-label='face'>✍</span>
                        </Button>
                    )}
                </Consumer>
            </Container>
        </Hero.Body>
    </Hero>
);

export const Footer = () => (
    <Section small style={{ display: "flex", alignItems: "flex-end" }}>
        <Content style={{ flexGrow: 3 }}>
            ↔ markdown left, result right
            <br />
            ⌨ live rendering as you type <br />
            🐦 tweets turn into linked screenshots
            <br />
            <span role="img" aria-label='tv'>📻</span> videos turn into linked screenshots
            <br />
            <span role="img" aria-label='box'>🖼</span>images get smallified and optimized
            <br />
            <span role="img" aria-label='lever'>🏗</span>code blocks turn into carbon.now.sh
            <br />
            <span role="img" aria-label='beach'>🏖</span> codesandboxes turn into screenshots
        </Content>
        <Content style={{ textAlign: "right" }}>
            <a href="https://24hrstartup.com">#24hrstartup</a> by{" "}
            <a href="https://swizec.com">Swizec</a> <span role="img" aria-label='heart'>❤️</span>
        </Content>
    </Section>
);

export default { Hero: MyHero, Footer };
