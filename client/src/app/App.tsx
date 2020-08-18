import React from "react";
import { Layout, PageHeader, Button } from 'antd';
import User from "../components/User";

import './App.css';

const { Header, Content, Footer } = Layout;

export default () => <Layout className="content-body">
  <Content>
    <User/>
  </Content>
  <Footer style={{ textAlign: 'center' }}>Fanlove technical exam 2020</Footer>
</Layout>
