import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Row,
  Avatar,
  Button,
  Image,
  Col
} from 'antd'
import {Link} from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { useContextInfo } from '../hooks/context'
import {userProfileFn} from '../services/auth'

const { Title, Paragraph, Text } = Typography;

export default function Profile() {
  const {user}  = useContextInfo()
  console.log(user)
  const [profile, setProfile] = useState({})

  useEffect(() => {
    async function getProfile() {
      const { data } = await userProfileFn(user?._id)
      setProfile(data)
      console.log(data)
    }

    getProfile()
  }, [])

  return (
    <Col>
      {user ? (
      <>
        <div>
          <Avatar size={128} src={<Image src={user?.image}/>}/>
        </div>
        <div>
        <Typography>
          <Title level={3}>
            Welcome, {user.userName}
          </Title>

          <Title level={5}>Username</Title>
          <Text>{user.userName}</Text>

          <Title level={5}>Name</Title>
          <Text>{user.firstName} {user.lastName}</Text>

          <Title level={5}>Email</Title>
          <Text>{user.email}</Text>

          <Title level={5}>City</Title>
          {user.city ? (
            <Text>{user.city}</Text>
          ):(
            <Text>Edit profile to add</Text>
          )}

          <Title level={5}>Country</Title>
          {user.country ? (
            <Text>{user.country}</Text>
          ):(
            <Text>Edit profile to add</Text>
          )}
          
        </Typography>
        </div>
        <br/>
        <Link to={`/profile/edit/${user?._id}`}><Button block>Edit Profile</Button></Link>
        
      </>
      ): (
        <Typography.Title level={3}>
          Login pls
        </Typography.Title>
      )}

    </Col>
  )
}