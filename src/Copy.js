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
                <Title>Build better newsletters 💌</Title>
                <SubTitle>
                    A #24hrstartup that helps you build better technical
                    newsletters. Write markdown, get newsletter. 🧙‍
                </SubTitle>
                <Content>
                    ✍ markdown left, 💌 letter result right
                    <br />
                    ⌨ live render as you type <br />
                    🏚 [urls] change to embeds
                </Content>
                <Consumer>
                    {({ tryExample }) => (
                        <Button large primary onClick={tryExample}>
                            Try example ✍
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
            📻 videos turn into linked screenshots
            <br />
            🖼 images get smallified and optimized
            <br />
            🏗 code blocks turn into carbon.now.sh
            <br />
            🏖 codesandboxes turn into screenshots
        </Content>
        <Content style={{ textAlign: "right" }}>
            <a href="https://24hrstartup.com">#24hrstartup</a> by{" "}
            <a href="https://swizec.com">Swizec</a> ❤️
        </Content>
    </Section>
);

export default { Hero: MyHero, Footer };
