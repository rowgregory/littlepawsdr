import React from 'react'
import styled from 'styled-components'
import { Flex } from '../../styles/Styles'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GrayIcon } from './styles'
import SplitTextToChars from '../../../utils/SplitTextToChars'
import { Image } from 'react-bootstrap'

const Container = styled.div`
height: 62px;
background: #fff;
width: 100%;
display: flex;
align-items: center;
padding-inline: 24px;
`

const AdminAvatar = styled(Image)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;

const Header = () => {
  const userInfo = useSelector((state: any) => state.userLogin.userInfo);
  return (
    <Container>    <Flex justifyContent='space-bewtween' alignItems='center'>
      <Flex alignItems='center'>
        <Link to='/' className='mr-2'>
          <GrayIcon className='fa-solid fa-house-chimney fa-sm'></GrayIcon>
        </Link>
        <SplitTextToChars
          text={`Hello ${userInfo?.name?.split(' ')[0]}`}
          page='dashboard'
          fontSize='14px'
          fontFamily={`'Plus Jakarta Sans', sans-serif`}
          color='gray'
          fontWeight={600}
        />
      </Flex>
      <Flex alignItems='center' justifyContent='end'>
        <AdminAvatar
          src={userInfo?.avatar}
          alt={`Hey ${userInfo?.name}! We appreciate you! Love from LPDR`}
        />
        <GrayIcon className="fa-solid fa-gear ml-3"></GrayIcon>
        <GrayIcon className="fa-solid fa-bell ml-3"></GrayIcon>
      </Flex>
    </Flex></Container>
  )
}

export default Header