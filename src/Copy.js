import React from "react";
import styled from "styled-components";
import HeroIMG from './Images/TechLetterHero.png'

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
    background-color: #135cb9;
    background-image: linear-gradient(45deg, #135cb9 23%, #0f3673 100%);
    height: 100%;
    margin: 0;
    @keyframes HeroAnimation {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 3;
    transform: translateY(0);
  }
}

    .title {
        font-size: 45px;
        font-weight: 900;
    }
    .subtitle {
        font-size: 20px;
        font-weight: 400;
        color: #fff;
    }
    strong {
        color: #000;
        bbackground-color: #ffc600;
        background-image: linear-gradient(45deg, #ffc600 17%, #faef5e 75%);
        padding: 0.2rem;
    }
    strong:hover {
        color: #fff;
    }
    img {
    
    height: 400px;
    animation: HeroAnimation;
    animation-duration: 6s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    
    @media (max-width: 940px) {
        .title {
            font-size: 60px;
        }
    }
`;

const WrapperGrid = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-gap: 1rem 0;
    align-items: center;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
    "Header Himger"
    "Copy Himger";

    .Head {
        grid-area: Header;
    }
    .Himg {
        grid-area: Himger;
    }
    .ContentCopy {
        grid-area: Copy;
    }
    .HeartMail {
        font-size: 70px;
    }
    h1 {
        color: #ffc600;
    }
    p {
        color: #fff;
    }
    Button {
        border: none;
        color: #fff;
        font-size: 20px;
        font-weight: 900;
        transition: 1s cubic-bezier(0.2, 0.8, 0.2, 1);
        background-color: #23c55b;
    }
    Button:hover {
        background-color: #ffc600;
        box-shadow: 0px 10px 20px rgba(0,0,0,0.5);
    transform: translateY(-9px);
    }
    
    @media (max-width: 940px) {
    grid-template-columns: 1fr;
    grid-template-areas:
    "Header"
    "Himger"
    "Copy"; 
    img {
        height: 200px;
    }
    }
`;
const WrapperFooter = styled.div`
    background-color: #135cb9;
    background-image: linear-gradient(45deg, #135cb9 23%, #0f3673 100%);
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
                <WrapperGrid>
                    <div className='Head'>
                        <span className='HeartMail' role="img" aria-label="mailheart">
                            💌
                        </span>
                        <Title >
                            Build Better Newsletters <br />
                        </Title>
                    </div>

                    <div className='Himg'>
                        <img  src={HeroIMG} alt='Hero'/>
                    </div>
                    <div className='ContentCopy'>
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
                            <Button  onClick={tryExample}>
                                Try Example{" "} 
                                  <span role="img" aria-label="face"> 
                                     ✍
                                </span>
                            </Button>
                        )}
                    </Consumer>
                    <br />
                    <a
                        href="https://www.youtube.com/watch?v=io-mQGGiICg"
                        
                    >
                        or watch demo video
                    </a>
                    </div>
                    </WrapperGrid>
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
