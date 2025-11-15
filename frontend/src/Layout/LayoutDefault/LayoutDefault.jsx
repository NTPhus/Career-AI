import {Layout } from 'antd'
import Header from './Header'
import Footer from "./Footer"
import { Outlet } from "react-router-dom";
import "./LayoutDefault.css"

const LayoutDefault = () => {
  return (
    <>
      <Layout className='layoutStyle'>
        <Header/>
        <Outlet/>
        <Footer/> 
      </Layout>
    </>
    
  )
}

export default LayoutDefault