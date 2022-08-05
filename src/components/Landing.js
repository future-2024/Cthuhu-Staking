// eslint-disable-next-line no-unused-expressions

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store';
import CircleChart from './Circle'
import { isMobile } from 'react-device-detect';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const responsive1 = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 10
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet2: {
        breakpoint: { max: 1024, min: 768 },
        items: 5
    },
    tablet1: {
        breakpoint: { max: 768, min: 464 },
        items: 4
    },
    mobile2: {
        breakpoint: { max: 464, min: 375 },
        items: 3
    },
    mobile1: {
        breakpoint: { max: 375, min: 0 },
        items: 2
    }
};

const Landing = () => {
    const global = useContext(StoreContext);

    return (
        <>
            <section className="hero" id="hero">
                <div className="container hero-firstpad">
                    <div className="row row--grid">
                        <div className='hero__content hero__content--left'>
                            <div className="col-12">
                                <div>
                                    <span className="hero__tagline">Cthulhu Farm</span>
                                    {global.lan === false ? <h2 className="hero__title">Earn up to 2.5% <br /> Daily</h2>
                                        : <h2 className="hero__title">Зарабатывайте до <br /> 2.5% ежедневно</h2>}
                                    {global.lan === false ? <p className="hero__text">Decentralized Ecosystem & MultyChain Aggregator</p>
                                        : <p className="hero__text">Децентрализованная экосистема и многосетевой агрегатор</p>}

                                    <div className="hero__btns hero__btns--left">
                                        {global.lan === false ? <Link to="/stake" className="hero__btn hero__btn--nephrite">START STAKING</Link>
                                            : <Link to="/stake" className="hero__btn hero__btn--nephrite">Начать стейкать</Link>}
                                    </div>
                                    <div className="game game--hero">
                                        <div className='hNiKSR badge-title'>
                                            28 Days
                                        </div>
                                        <div className="game__head">
                                            <div className="game__cover">
                                                <img src="../../mark.png" alt="" />
                                            </div>

                                            {global.lan === false ? <div className="game__title">
                                                <h3 className="game__name ">
                                                    BUSD Staking
                                                </h3>
                                                <span className="game__blockchain">
                                                    Blockchain
                                                    <img src="../../bsc.svg" alt="" />
                                                </span>
                                            </div>
                                                : <div className="game__title">
                                                    <h3 className="game__name">
                                                        BUSD Staking
                                                    </h3>
                                                    <span className="game__blockchain">
                                                        Блокчейн
                                                        <img src="../../bsc.svg" alt="" style={{ marginLeft: '37px' }} />
                                                    </span>
                                                </div>}
                                        </div>
                                        {global.lan === false ? <p className="game__description">Farm 2.5 % of your BUSD deposit</p>
                                            : <p className="game__description-ru">Зарабатывайте 2.5% от вашего депозита</p>}
                                        {global.lan === false ?
                                            <ul className="game__list">
                                                <li>Devices: <span className="required">Web, Android, iOS</span></li>
                                                <li>
                                                    Time: <span className="required">Unlimited</span>
                                                </li>
                                                <li>
                                                    Commission: <span className="required">3 %</span>
                                                </li>
                                                <li>
                                                    Status: <span className="process" style={{ color: 'green' }}>Live</span>
                                                </li>
                                            </ul>
                                            : <ul className="game__list" >
                                                <li>Устройства:<span className="required">Web, Android, iOS</span></li>
                                                <li>
                                                    Срок: <span className="required">Безлимит</span>
                                                </li>
                                                <li>
                                                    Комиссия: <span className="required">3 %</span>
                                                </li>
                                                <li>
                                                    Статус: <span className="process" style={{ color: 'green' }}> Онлайн</span>
                                                </li>
                                            </ul>}
                                    </div>
                                </div>
                            </div>

                            <div className='partner_carousel container mt-5'>
                                <div className='container d-flex flex-wrap justify-content-around border-white'>
                                    <div className="game__head">
                                        <div className="game__cover">
                                            <img src="dima1.jpg" alt="" />
                                        </div>

                                        <div className="game__title">
                                            <p className="game__name">
                                                BSW<span className='tiny_letter_minus'>+0.05%</span>
                                            </p>
                                            <span className="game__blockchain">
                                                0.36$
                                            </span>
                                        </div>
                                    </div>
                                    <div className="game__head">
                                        <div className="game__cover">
                                            <img src="dima1.jpg" alt="" />
                                        </div>

                                        <div className="game__title">
                                            <p className="game__name">
                                                BSW<span className='tiny_letter_plus'>+0.05%</span>
                                            </p>
                                            <span className="game__blockchain">
                                                145$
                                            </span>
                                        </div>
                                    </div>
                                    <div className="game__head">
                                        <div className="game__cover">
                                            <img src="dima1.jpg" alt="" />
                                        </div>

                                        <div className="game__title">
                                            <p className="game__name">
                                                BSW<span className='tiny_letter_plus'>+0.05%</span>
                                            </p>
                                            <span className="game__blockchain">
                                                1.56$
                                            </span>
                                        </div>
                                    </div>
                                    <div className="game__head">
                                        <div className="game__cover">
                                            <img src="dima1.jpg" alt="" />
                                        </div>

                                        <div className="game__title">
                                            <p className="game__name">
                                                BSW<span className='tiny_letter_minus'>+0.05%</span>
                                            </p>
                                            <span className="game__blockchain mx-auto">
                                                1034$
                                            </span>
                                        </div>
                                    </div>
                                    <div className="game__head">
                                        <div className="game__cover">
                                            <img src="dima1.jpg" alt="" />
                                        </div>

                                        <div className="game__title">
                                            <p className="game__name">
                                                BSW<span className='tiny_letter_plus'>+0.05%</span>
                                            </p>
                                            <span className="game__blockchain">
                                                5.67$
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <h2>CTHULHU Partners</h2>
                                <Carousel
                                    swipeable={false}
                                    draggable={false}
                                    showDots={false}
                                    responsive={responsive1}
                                    ssr={true} // means to render carousel on server-side.
                                    infinite={true}
                                    autoPlay={isMobile ? true : false}
                                    autoPlaySpeed={3000}
                                    keyBoardControl={true}
                                    transitionDuration={500}
                                    containerClass="carousel-container"
                                    removeArrowOnDeviceType={["tablet1", "tablet2", "mobile1", "mobile2"]}
                                    // dotListClass="custom-dot-list-style"
                                    itemClass="carousel-item-padding-40-px">
                                    <div className='image-container'>
                                        <img src='Betfury-gray.png' className='srcShow' alt='dima2' />
                                        <img src='Betfury.png' className='srcHidden' alt='dima2' />
                                    </div>
                                    <div className='image-container'>
                                        <img src='BitKeep-gray.png' className='srcShow' alt='dima3' />
                                        <img src='BitKeep.png' className='srcHidden' alt='dima3' />
                                    </div>
                                    <div className='image-container'>
                                        <img src='CoinGecko-gray.png' className='srcShow' alt='dima1' />
                                        <img src='CoinGecko.png' className='srcHidden' alt='dima1' />
                                    </div>
                                    <div className='image-container'>
                                        <img src='CoinMarketСap-gray.png' className='srcShow' alt='dima2' />
                                        <img src='CoinMarketСap.png' className='srcHidden' alt='dima2' />
                                    </div>
                                    <div className='image-container'>
                                        <img src='DappRadar-gray.png' className='srcShow' alt='dima2' />
                                        <img src='DappRadar.png' className='srcHidden' alt='dima2' />
                                    </div>
                                    <div className='image-container'>
                                        <img src='DeBank-gray.png' className='srcShow' alt='dima2' />
                                        <img src='DeBank.png' className='srcHidden' alt='dima2' />
                                    </div>
                                    <div className='image-container'>
                                        <img src='Ripae-gray.png' className='srcShow' alt='dima2' />
                                        <img src='Ripae.png' className='srcHidden' alt='dima2' />
                                    </div>
                                    <div className='image-container'>
                                        <img src='TokenPocket-gray.png' className='srcShow' alt='dima2' />
                                        <img src='TokenPocket.png' className='srcHidden' alt='dima2' />
                                    </div>
                                    <div className='image-container'>
                                        <img src='ExoBots-gray.png' className='srcShow' alt='dima2' />
                                        <img src='ExoBots.png' className='srcHidden' alt='dima2' />
                                    </div>
                                    <div className='image-container'>
                                        <img src='SafePal-gray.png' className='srcShow' alt='dima3' />
                                        <img src='SafePal.png' className='srcHidden' alt='dima3' />
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </section>
            <section className='hero_carousel container'>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={isMobile ? true : false}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px">
                    <div><img src='dima1.jpg' alt='dima1' /></div>
                    <div><img src='dima2.jpg' alt='dima2' /></div>
                    <div><img src='dima3.jpg' alt='dima3' /></div>
                </Carousel>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <div className="step step--first">
                                <span className="step__number">01</span>
                                {global.lan === false ? <h3 className="step__title">Invest and Earn</h3>
                                    : <h3 className="step__title">Инвестируйте</h3>}
                                {global.lan === false ? <p className="step__text">Make deposit in BUSD and earn 2.5% daily.</p>
                                    : <p className="step__text">Инвестируйте в BUSD и зарабатываете 2.5% ежедневно. </p>}
                                {global.lan === false ? <p className="step__text">More deposit - More Reward.</p>
                                    : <p className="step__text"><br /></p>}
                            </div>
                        </div>

                        <div className="col-12 col-lg-4">
                            <div className="step step--green step--first">
                                <span className="step__number">02</span>
                                {global.lan === false ? <h3 className="step__title">Reinvest</h3> : <h3 className="step__title">Реинвестируйте</h3>}
                                {global.lan === false ? <p className="step__text">Reinvest your rewards.</p>
                                    : <p className="step__text">Реинвестируйте ваши награды и увеличивайте свою прибыль.</p>}
                                {global.lan === false ? <p className="step__text">Yeah, more deposit means more reward.</p>
                                    : <p className="step__text"><br /></p>}
                            </div>
                        </div>

                        <div className="col-12 col-lg-4">
                            <div className="step step--light step--first">
                                <span className="step__number">03</span>
                                {global.lan === false ? <h3 className="step__title"> Invite Friends </h3>
                                    : <h3 className="step__title"> Приглашай друзей </h3>}
                                {global.lan === false ? <p className="step__text">Invite your friends and earn 3% from their deposits.<br /><br /></p>
                                    : <p className="step__text">За каждого приглашённого друга ты сможешь получать до 3% пассивной прибыли</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section--bt">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 align-self-center" style={{ marginTop: '-100px' }}>
                            <div className="section__title section__title--grid-right">
                                {global.lan === false ? <strong className='mt-5'>Economics & Commissions</strong> : <strong className='mt-5'>Экономика & Комиссии</strong>}
                                <h2>Commissions</h2>
                                {global.lan === false ? <p>CTHULHU uses a unique algorithm to generate profits in BUSD and other tokens. <br />We only charge a deposit and withdrawal fee, which is 3%.</p>
                                    : <p>CTHULHU использует уникальный алгоритм для генерации прибыли в BUSD и других токенах.<br />
                                        Мы взимаем только комиссию за депозит и вывод, которая составляет 3%. </p>}
                                {global.lan === false ? <p>The Referral commission is not paid by you, it is paid directly from the smart contract.</p>
                                    : <p>Реферальная система не входит в комиссию, которая оплачивает пользователем, она идёт напрямую со смарт-контракта. </p>}
                            </div>

                            <ul className="section__tokenomics section__tokenomics--right">
                                {global.lan === false ? <li className="clr1">Deposit – 3%</li>
                                    : <li className="clr1">Депозит – 3%</li>}
                                {global.lan === false ? <li className="clr2">Withdraw–3%</li>
                                    : <li className="clr2">Вывод – 3%</li>}
                                {global.lan === false ? <li className="clr3">Referral  – 3%</li>
                                    : <li className="clr3">Реферал – 3%</li>}
                            </ul>
                        </div>

                        <div className="col-12 col-lg-6 align-self-center mb-5">
                            <div className="section__chart mb-5">
                                <div className='d-flex justify-content-center mt-2'>
                                    <CircleChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr />

        </>
    )
}

export default Landing;
