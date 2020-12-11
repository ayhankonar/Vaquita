import React from 'react'
import { Layout, Menu, Image } from 'antd';
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context'
import { logoutFn } from '../services/auth'
import {useHistory} from 'react-router-dom'
const { Header, Content, Footer } = Layout;


const LayoutApp = ({ children }) => {
  let history = useHistory()
  //LEER USER
  // const { clearCtxUser, user } = useContext(MyContext)
  const { clearCtxUser, user } = useContextInfo()

  //PARA LOGOUT
  async function handleLogout() {
    await logoutFn()
    history.push('/login')
    clearCtxUser()
  }

  return (
    <Layout className="layout">
      <Header style={{position: 'fixed', height: 65.5, zIndex: 1000, width: '100%', backgroundColor: "#8db596"}}>
        <div className="logo" />
        <Menu style={{backgroundColor: "#8db596"}}  mode="horizontal">

          <Menu.Item key="1">
            <img style ={{width:90}}src="https://res.cloudinary.com/dj9edroyv/image/upload/v1607624315/Vaquita/p35w19kaw7nigxkluy8m.png"></img>
            <Link to="/" />
          </Menu.Item>

          {!user ? <>
              <Menu.Item 
                style={{color:'white'}}
                key="2">
                <Link to="/signup">Signup</Link>
              </Menu.Item>

              <Menu.Item key="3">
                <Link to="/login">Login</Link>
              </Menu.Item>
            </> : <>
              <Menu.Item key="2">
                <Link to="/profile">Perfil</Link>
              </Menu.Item>

              <Menu.Item key="3">
                <Link to="/new/rifas">Crear Rifa</Link>
              </Menu.Item>
    
              <Menu.Item key="4">
                  <Link to="/rifas/myrifas">Mis rifas</Link>
                </Menu.Item>

              <Menu.Item key="5">
                  <Link to="/tickets/mytickets">Mis Tickets</Link>
                </Menu.Item>

              <Menu.Item key="6" onClick={handleLogout}>
                Logout
              </Menu.Item>
              </>}          
        </Menu>
        <Menu style={{backgroundColor: "#bedbbb"}} mode="horizontal">

        </Menu>
      </Header>
      <br />
      <Content style={{ padding: '50px 0', minHeight: 'calc(100vh - 153.6px)' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Vaquita de la suerte <img style={{width: 40}} src="https://res.cloudinary.com/dj9edroyv/image/upload/v1607624315/Vaquita/p35w19kaw7nigxkluy8m.png"/> <br/> ©2020 Created by Ayhan Konar & Karen Roth</Footer>
    </Layout>
  )
}

export default LayoutApp