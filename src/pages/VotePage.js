import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

import VoteCell from '../components/VoteCell';
import Modal from '../components/Modal';

import getCandidates from '../service/getCandidates';

export default function VotePage() {
  const [candidates, setCandidates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, removeCookie] = useCookies(['token']);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const logout = () => {
    removeCookie('token');
    setIsLoggedIn(false);
  };

  const handleAuthButton = () => {
    isLoggedIn ? logout() : openModal();
  };

  useEffect(() => {
    getCandidates(setCandidates);
    cookies.token && cookies.token === 'undefined' ? setIsLoggedIn(false) : setIsLoggedIn(true);
  });

  const candidatesList = candidates.map((person, index) => {
    return <VoteCell {...{ key: index, rank: index, ...{ person }, setIsModalOpen, cookies }} />;
  });

  return (
    <Wrapper>
      <Title>
        <RedColor>Q. 13기 프론트엔드 팀장</RedColor>은 누구?
      </Title>
      <SubTitle>CEOS 프론트엔드 13기 개발팀장 투표 창입니다.</SubTitle>

      <VoteBox>{candidatesList}</VoteBox>
      <AuthButton onClick={handleAuthButton}>{isLoggedIn ? '로그아웃' : '로그인'}</AuthButton>
      <Modal isOpen={isModalOpen} close={closeModal} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f2f2f2;
`;

const Title = styled.h3`
  margin: 0;

  padding: 20px 10px;

  font-size: 20px;
`;

const RedColor = styled.span`
  color: red;
  font-weight: bold;
  font-size: 22px;
`;
const SubTitle = styled.h5`
  padding: 0;

  margin: 0 10px;
`;

const VoteBox = styled.div`
  margin: 30px 0;
  padding: 0;

  background-color: #f2f2f2;
  border: solid 1px black;
  box-shadow: 0 4px 8px 0 rgba(69, 111, 128, 0.25);
`;

const AuthButton = styled.div`
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 25px;

  background-color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 4px 8px 0 rgba(69, 111, 128, 0.5);

  color: white;
  padding: 10px 10px;
  margin: 0 auto;
  width: 200px;

  font-size: 20px;
  font-weight: bold;
  text-align: center;

  cursor: pointer;
`;
