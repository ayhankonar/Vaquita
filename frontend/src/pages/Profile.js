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
  const [profile, setProfile] = useState({})

  useEffect(() => {
    async function getProfile() {
      const { data } = await userProfileFn(user._id)
      setProfile(data);
     
    }

    getProfile()
  }, [])

  return (
    <Row>
      {profile ? (
      <>
        <div>
          <Avatar size={128} src={<Image src={user.image}/>}/>
        </div>
        <Typography>
          <Title level={3}>
            Welcome, {profile.userName}
          </Title>

          <Title level={5}>Username</Title>
          <Text>{profile.userName}</Text>

          <Title level={5}>Name</Title>
          <Text>{profile.firstName} {profile.lastName}</Text>

          <Title level={5}>Email</Title>
          <Text>{profile.email}</Text>

          <Title level={5}>City</Title>
          {profile.city ? (
            <Text>{profile.city}</Text>
          ):(
            <Text>Edit profile to add</Text>
          )}

          <Title level={5}>Country</Title>
          {profile.country ? (
            <Text>{profile.country}</Text>
          ):(
            <Text>Edit profile to add</Text>
          )}
          
        </Typography>
        <Link to={`/profile/edit/${profile._id}`}><Button block>Edit Profile</Button></Link>
        
      </>
      ): (
        <Typography.Title level={3}>
          Login pls
        </Typography.Title>
      )}

    </Row>
  )
}