import React from "react";
import { Section, Hero, Container, Title, SubTitle, Content } from "reactbulma";

export const MyHero = () => (
    <Hero>
        <Hero.Body>
            <Container>
                <Title>Build better newsletters</Title>
                <SubTitle>
                    A #24hrstartup that helps you build better technical
                    newsletters. Write markdown, get newsletter.
                </SubTitle>
                <Content>
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
            </Container>
        </Hero.Body>
    </Hero>
);

export default { Hero: MyHero };
