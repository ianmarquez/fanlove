import React from 'react';
import { Button, PageHeader, Row, Col, Table, message, Modal } from 'antd';
import { User } from '../models/common';
import UserService from '../services/UserService';

interface State {
  users: Array<User>;
  loading: boolean;
  modalVisible: boolean;
}
interface Props {}

const TABLE_COLUMNS = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Firstname',
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: 'LastName',
    dataIndex: 'lastName',
    key: 'lastName'
  }
]

class UserContainer extends React.Component<Props, State> {
  private userService: UserService;
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      modalVisible: false,
    }
    this.userService = new UserService('http://localhost:8000');
  }

  private async getUsers(): Promise<void> {
    let users: User[] = [];
    try {
      users = await this.userService.getAllUsers();
      message.success('Fetching Users Successful!');
    } catch(err) {
      message.error('Error fetching users.');
    }
    this.setState({
      loading: false,
      users,
    });
  }

  private async addUsers(firstName: string, lastName: string) : Promise<void> {
    const res = this.userService.addUser(firstName, lastName);
    if (res) {
      message.success('User was successfully added.');
    } else {
      message.error('An error has occurred adding ther user.')
    }
    this.setState({
      loading: false,
      users: [...this.state.users, ...(res ? [ {id: this.state.users.length + 1, firstName, lastName}] : [])]
    });
  }

  public async componentDidMount(): Promise<void> {
    await this.getUsers();
  }

  public render() {
    const { users, loading, modalVisible } = this.state;
    return <>
    <Row>
      <Col span={24}>
        <PageHeader
          className="page-header"
          title="Users table"
          ghost={true}
          backIcon={false}
          extra={[
            <Button hidden type="primary" key="1" onClick={() => this.setState({modalVisible: !this.state.modalVisible})}>Add</Button>,
          ]}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
          <Table 
            loading={loading} 
            columns={TABLE_COLUMNS} 
            dataSource={users} 
            pagination={false} 
            onRow={(record: User, rowIndex?: number) =>  {
              return {
                onClick: () => this.setState({ loading: true }, () => this.addUsers(record.firstName, record.lastName))
              }
            }}
          />
      </Col>
    </Row>
    </>
  }
}

export default UserContainer;