import React from 'react';
import { 
  Typography, 
  Row,
  Avatar,
  Button,
  Image,
  Col 
} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useContextInfo } from '../hooks/context'
import {userProfileFn, userProfileEdit} from '../services/auth'

const { Title, Paragraph, Text, Link } = Typography;
export default function Profile() {
  const {user}  = useContextInfo()

  return (
    <Row>
      {user ? (
      <>
        <div>
          <Avatar size={128} src={<Image src={user.image}/>}/>
        </div>
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
        <Button block>Edit Profile</Button>
      </>
      ): (
        <Typography.Title level={3}>
          Login pls
        </Typography.Title>
      )}
      <a href={'http://localhost:3000/profile/edit'}>

      </a>
    </Row>
  )
}