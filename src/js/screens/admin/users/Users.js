import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddIcon from 'grommet/components/icons/base/Add';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import EditIcon from 'grommet/components/icons/base/Edit';
import Header from 'grommet/components/Header';
import Search from 'grommet/components/Search';
import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../../../components/NavControl';

import { pageLoaded } from '../../utils';

const users = [
  {id: 1, name: 'Augusto F. Rodrigues', username: 'afrodrigues', email: 'afrodrigues@afrodrigues.io', active: true},
  {id: 2, name: 'Lenilson V. Nunes', username: 'lvnunes', email: 'lvnunes@lvnunes.io', active: true}
];

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      sortIndex: 1,
      sortAscending: true
    };

    this._onSearch = this._onSearch.bind(this);
    this._onSort = this._onSort.bind(this);
  }

  componentDidMount() {
    const { intl } = this.context;
    pageLoaded(getMessage(intl, 'Users'));
  }

  _onSearch(event) {
    const search = event.target.value;
    if (search) {
      alert(`make api request for ${search}`);
    }

    this.setState({ search });
  }

  _onSort(index, ascending) {
    let prop;
    switch (index) {
      case 1:
        prop = 'name';
        break;
      case 2:
        prop = 'username';
        break;
      case 3:
        prop = 'email';
        break;
      case 4:
        prop = 'active';
        break;

      default:
        break;
    }
    if (prop) {
      users.sort((a, b) => {
        if (ascending) {
          return a[prop] > b[prop];
        }
        return a[prop] < b[prop];
      });
    }

    this.setState({
      sortIndex: index,
      sortAscending: ascending
    });
  }

  render() {
    const { intl } = this.context;
    const { search, sortIndex, sortAscending } = this.state;

    const tableHeaders = [
      '',
      getMessage(intl, 'Name'),
      getMessage(intl, 'Username'),
      getMessage(intl, 'Email'),
      getMessage(intl, 'Active')
    ];

    const usersNode = users.map(user => (
      <TableRow key={user.id}>
        <td>
          <Button icon={<EditIcon/>} onClick={() => alert(`edit user ${user.id}`)}/>
          <Button icon={<CloseIcon colorIndex='critical'/>} critical={true} onClick={() => alert(`delete user ${user.id}`)}/>
        </td>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{getMessage(intl, user.active ? 'Yes' : 'No')}</td>
      </TableRow>
    ));

    return (
      <Article primary={true}>
        <Header
          direction='row'
          justify='between'
          size='large'
          pad={{ horizontal: 'medium', between: 'small' }}
        >
          <NavControl name={getMessage(intl, 'Users')} />
        </Header>
        <Box align='start' margin='medium'>
          <Button
            icon={<AddIcon/>}
            label={getMessage(intl, 'Register')}
            primary={true}
            path='/user'/>
        </Box>
        <Box margin='medium'>
          <Search fill={true}
            inline={true}
            placeHolder={getMessage(intl, 'Search')}
            onDOMChange={this._onSearch}
            value={search}/>
        </Box>
        <Table onMore={() => alert('call api for more data')}>
          <TableHeader labels={tableHeaders}
            sortIndex={sortIndex}
            sortAscending={sortAscending}
            onSort={this._onSort}/>
          <tbody>
            {usersNode}
          </tbody>
        </Table>
      </Article>
    );
  }
}

Users.contextTypes = {
  intl: PropTypes.object
};

export default Users;
