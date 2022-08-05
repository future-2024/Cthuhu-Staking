
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../store";
import * as Web3 from 'web3'
import { BUSD_ADDRESS, STAKING_CONTRACT_ADDRESS } from '../constant';
import { WalletContext } from "../context/wallet";
import { BUSDABI, STAKING_POOL } from '../abi';
import BigNumber from "bignumber.js";
import useClipboard from "react-use-clipboard";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Home = () => {
    const global = useContext(StoreContext);
    const [balance, setBalance] = useState('0');
    const [walletAddress] = useContext(WalletContext);
    const [link] = useState("cthulhu.farm/?ref=");
    const [amount, setAmount] = useState('0');
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [reward, setReward] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [referralAddress, setReferralAddress] = useState('');
    const [referralCount, setReferralCount] = useState(0);
    const [referralAmount, setReferralAmount] = useState(0);
    const [isCopied, setCopied] = useClipboard(link + walletAddress);
    const [tvl, setTVL] = useState(0);
    const [open, setOpen] = useState(false);
    const web3 = new Web3(window.ethereum);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
        setCopied(link + walletAddress);
    };

    useEffect(() => {
        if (!global.walletConnected) {
            initialize();
        }
    }, [global.walletConnected])

    useEffect(() => {
        const getBalance = async () => {
            if (walletAddress === "" || walletAddress === null) {
                setBalance('0');

            } else {
                const contract = new web3.eth.Contract(BUSDABI, BUSD_ADDRESS);
                const userBalance = await contract.methods.balanceOf(walletAddress).call();
                setBalance((userBalance / (10 ** 18)).toFixed(2));
            }
        }
        getBalance();
    }, [web3?.eth?.Contract, walletAddress])

    useEffect(() => {
        const getInit = async () => {
            const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
            let temp = await stakingContract.methods.calcWithdraw(walletAddress).call({ from: walletAddress });
            setWithdrawAmount(temp);
            temp = await stakingContract.methods.calcReward(walletAddress).call({ from: walletAddress });
            setReward((temp / (10 ** 18)).toFixed(2));
            temp = await stakingContract.methods.getTotalDeposit(walletAddress).call({ from: walletAddress });
            setTotalAmount((temp / (10 ** 18)).toFixed(2));
            const url = window.location.href;
            let urls = url.split('=');
            if (urls.length > 1)
                setReferralAddress(urls[1]);
            temp = await stakingContract.methods.getUserReferralCount(walletAddress).call({ from: walletAddress });
            setReferralCount(temp);
            temp = await stakingContract.methods.getTotalReferral(walletAddress).call({ from: walletAddress });
            setReferralAmount((temp / (10 ** 18)).toFixed(2));
        }
        if (walletAddress !== '')
            getInit();
    }, [walletAddress, web3?.eth, isCopied])

    const initialize = () => {
        setBalance(0)
        setTotalAmount(0)
        setReferralCount(0)
        setReferralAmount(0)
        setReward(0)
    }
    

    const approve = async () => {
        try {
            const busdContract = new web3.eth.Contract(BUSDABI, BUSD_ADDRESS);
            const depositContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
            const allowance = await busdContract.methods.allowance(walletAddress, STAKING_CONTRACT_ADDRESS).call();
            if (parseInt(allowance) < amount * 10 ** 18)
                await busdContract.methods.approve(STAKING_CONTRACT_ADDRESS, BigNumber(amount * 10 ** 18).toFixed().toString()).send({ from: walletAddress });

            if (referralAddress === '')
                await depositContract.methods.userDeposit(walletAddress, BigNumber(amount * 10 ** 18).toFixed().toString()).send({
                    from: walletAddress,
                });

            else await depositContract.methods.userDeposit(referralAddress, BigNumber(amount * 10 ** 18).toFixed().toString()).send({
                from: walletAddress,
            });

            global.setLoad(true);

        } catch (err) {
            console.log(err);
        }
    }

    const getReward = async () => {
        const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
        await stakingContract.methods.withdrawReward().send({ from: walletAddress });
    }

    const withDrawDeposit = async () => {
        if (amount !== '0') {
            const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
            await stakingContract.methods.withdrawDeposit((BigNumber(amount) * 10 ** 18).toString()).send({ from: walletAddress });
        } else {
            alert("Please enter invalid number!");
        }
    }

    const withdrawReferral = async () => {
        const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
        await stakingContract.methods.withdrawReferral().send({ from: walletAddress });
    }

    useEffect(() => {
        const init = async () => {
            const contract = new web3.eth.Contract(BUSDABI, BUSD_ADDRESS);
            const tvl = await contract.methods.balanceOf(STAKING_CONTRACT_ADDRESS).call();
            setTVL((tvl / (10 ** 18)).toFixed(2));
        }
        init();
        const intervalId = setInterval(() => {
            init();
        }, 1000 * 30) // in milliseconds
        return () => clearInterval(intervalId)
    }, [web3.eth.Contract])

    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);

    return (
        <div className="mb-5">
            <div className="section section--pb0 section--first">
                <div className="section__article-head"> 
                </div>
            </div>

            <div className="section section--article mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="staking staking-first">
                                <div className="d-flex">
                                    <img src="../../staking-logo.svg" alt="" />
                                    <div className="staking__info align-self-center">
                                        { global.lan === false ? <h2>BUSD Farming</h2> : <h2>BUSD Ферма</h2> }
                                        { global.lan === false ? <p>Stake BUSD - Earn BUSD</p> : <p>Инвестировать - Зарабатывать BUSD</p> }
                                    </div>
                                </div>
                            </div>
                            <div className="staking-center">
                                <div className="staking-apr d-flex justify-content-between">
                                    <div className="d-flex">
                                        <span className="staking-apr-letter">APR</span>
                                        <i className="mx-2 fa fa-calculator"></i>
                                        <i className="fa fa-question-circle-o"></i>
                                    </div>
                                    <span className="staking-apr-letter">912,5%</span>

                                </div>

                                <div className='staking-main d-flex justify-content-between'>
                                    <div className="staking-main-first">
                                        { global.lan === false ? <p>Staked BUSD</p> : <p>Стейкинг BUSD</p> }
                                        <span>{totalAmount} BUSD</span>
                                    </div>
                                    <div>
                                        <button className="staking-plus-active" onClick={() => setModalShow(true)}>+</button>
                                        <button className="staking-plus" onClick={() => setModalShow1(true)}>-</button>
                                    </div>
                                </div>
                                <div className='staking-reward d-flex justify-content-between'>
                                    <div className="staking-main-first">
                                        { global.lan === false ? <p>EARN BUSD</p> : <p>Награда BUSD</p> }
                                        <span>{reward} BUSD</span>
                                    </div>
                                    <div className="staking-plus-minus">
                                        { global.lan === false ? <button className="staking-withdraw" onClick={getReward}>Withdraw</button>
                                         : <button className="staking-withdraw-ru" onClick={getReward}>Вывести</button> }
                                    </div>
                                </div>
                                <div className="staking-note">
                                    { global.lan === false ? <p className="mb-3">3% deposit fee</p> : <p>3% комиссия за депозит</p> }
                                    { global.lan === false ? <p className="mb-3">3% withdraw fee</p> : <p>3% вывести за депозит</p> }
                                    <div className="d-flex justify-content-between mt-4">
                                        { global.lan === false ? <span className="stake-slash">Total staked&nbsp;&nbsp;- - - - - - - - - - - - - - - - - - - - - - - - - &nbsp;&nbsp;</span>
                                        : <span className="stake-slash" style={{ fontSize:'13px !important'}}>Общий депозит&nbsp;&nbsp;- - - - - - - - - - - - - - - - - - - - - - - - - &nbsp;&nbsp;</span> }
                                        <span className="total-right d-flex" style={{ fontSize:'14px'}}> {tvl}</span>
                                    </div>
                                </div>  
                                <div className="staking-main mb-5">
                                    { global.lan === false ? <a href='https://bscscan.com/address/0x333602758Af0B007769923dF8A0deb55B876ab2E' target='_blank' rel="noreferrer">View Contract</a>
                                    : <a href='https://bscscan.com/address/0x333602758Af0B007769923dF8A0deb55B876ab2E' target='_blank' rel="noreferrer">Посмотреть Контракт</a> }
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 mb-5">
                            <div className="staking staking--second">
                                { global.lan === false ? <h2>My Referral Link</h2> : <h2>Моя реферальная ссылка</h2> }
                                <div className="referral-link-input">
                                    <input type='text' value={link + walletAddress} className="input referal-url-input" name="referral" readOnly />
                                    <div>
                                        <Grid container justifyContent="center">
                                            <Grid item>
                                                <ClickAwayListener onClickAway={handleTooltipClose}>
                                                    <div>
                                                        <Tooltip
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose}
                                                            open={open}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title="Copied!"
                                                            arrow
                                                        >
                                                            <img src="/regclone.svg" className="button copyLink" alt="" onClick={handleTooltipOpen} onMouseOut={handleTooltipClose} />
                                                        </Tooltip>
                                                    </div>
                                                </ClickAwayListener>
                                            </Grid>
                                        </Grid>
                                    </div>


                                </div>
                                { global.lan ===false ? <div className="get-referral text-center">
                                    <p className="mb-3">You will get</p>
                                    <span>3%</span>
                                    <p className="mt-2">from every win of </p><p>your referral</p>
                                </div>
                                : <div className="get-referral text-center">
                                    <p className="mb-3">Вы будете получать</p>
                                    <span>3%</span>
                                    <p className="mt-2">с каждого выигрыша </p><p>вашего реферала</p>
                                </div> }
                                <div className="your-referral d-flex justify-content-between">
                                    { global.lan === false ? <span>Your Referrals</span> : <span>Ваши рефералы</span> }
                                    <span>{referralCount}</span>
                                </div>
                            </div>
                            

                            <div className="staking withdraw-referral">
                                { global.lan === false ? <h4>Farm Referrals</h4> : <h4>Рефералы фермы</h4> }
                                <p>{referralAmount} BUSD</p>
                                <div className="d-flex justify-content-between referral-button">
                                    { global.lan === false ? <button className="staking-withdraw" onClick={withdrawReferral}>Withdraw</button> :
                                    <button className="staking-withdraw-ru" onClick={withdrawReferral} style={{ fontSize:'16px'}}>реферальная награда</button> } 
                                    <div>
                                        <img src="/staking-logo-blue.svg" alt=""/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <WithdrawModal
                    withdrawAmount={withdrawAmount}
                    withDrawDeposit={withDrawDeposit}
                    setAmount={setAmount}
                    amount={amount}
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                />
                <DepositModal
                    approve={approve}
                    balance={balance}
                    setAmount={setAmount}
                    amount={amount}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </div>
    )
}

function DepositModal(props) {

    const { balance, setAmount, amount, approve } = props;

    const handleConfirm = () => {
        props.onHide();
        approve();
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    { global.lan === false ? <span className="modal-title">Stake BUSD Tokens</span> 
                        :<span className="modal-title">Размещайте BUSD токены</span> }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="busd-form d-flex flex-column">
                    { global.lan === false ? <span className="text-right">{balance} BUSD Available</span>
                        : <span className="text-right">{balance} BUSD Доступно</span> }
                    <div style={{ textAlign:'right'}}>
                        <input type="number" className="input-busd" value={amount} placeholder="0.00" onChange={(e) => setAmount(e.target.value)} />
                        <button className='max-amount' onClick={() => setAmount(balance)}>Max</button> <span className="busd-symbol">BUSD</span>
                    </div>
                </div>
                <div className="modal-btn-group">
                    { global.lan === false ? <Button className="cancel-btn" onClick={props.onHide}>Cancel</Button>
                        : <Button className="cancel-btn" onClick={props.onHide}>Отмена</Button> }
                    { global.lan === false ? <Button className="confirm-btn" onClick={handleConfirm}>Confirm</Button>
                        : <Button className="confirm-btn" onClick={handleConfirm}>Подтвердите</Button> }
                </div>

            </Modal.Body>
        </Modal>
    );
}

function WithdrawModal(props) {

    const { withdrawAmount, setAmount, amount, withDrawDeposit } = props;

    const handleDeposit = () => {
        props.onHide();
        withDrawDeposit();
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    { global.lan === false ? <span className="modal-title">Withdraw BUSD Tokens</span> 
                        :<span className="modal-title">Вывести BUSD токены</span> }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="busd-form d-flex flex-column">
                    { global.lan === false ? <span className="text-right">{withdrawAmount} BUSD Available</span>
                        : <span className="text-right">{withdrawAmount} BUSD Доступно</span> }
                    <div style={{ textAlign:'right'}}>
                        <input type="number" className="input-busd" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                        <button className='max-amount' onClick={() => setAmount(withdrawAmount)}>Max</button> <span className="busd-symbol">BUSD</span>
                    </div>
                </div>
                <div className="modal-btn-group">
                    { global.lan === false ? <Button className="cancel-btn" onClick={props.onHide}>Cancel</Button>
                        : <Button className="cancel-btn" onClick={props.onHide}>Отмена</Button> }
                    { global.lan === false ? <Button className="confirm-btn" onClick={handleDeposit}>Confirm</Button>
                        : <Button className="confirm-btn" onClick={handleDeposit}>Подтвердите</Button> }
                </div>

            </Modal.Body>
        </Modal>
    );
}


export default Home;