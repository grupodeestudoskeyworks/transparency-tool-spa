import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Paragraph from 'grommet/components/Paragraph';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';

import { pageLoaded } from './utils';

class Contributors extends Component {
  componentDidMount() {
    pageLoaded('Tasks');
    this.props.dispatch(loadTasks());
  }

  render() {
    const { intl } = this.context;

    return (
      <Article primary={true}>
        <Header
          direction='row'
          justify='between'
          size='large'
          pad={{ horizontal: 'medium', between: 'small' }}
        >
          <NavControl name={getMessage(intl, 'Tasks')} />
        </Header>
        {/* {errorNode} */}
        <Box pad={{ horizontal: 'medium' }}>
          <Paragraph size='large'>
                The backend here is using websocket.
          </Paragraph>
        </Box>
        {/* {listNode} */}
      </Article>
    );
  }
}

Contributors.defaultProps = {
  error: undefined,
  contributors: []
};

Contributors.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  contributors: PropTypes.arrayOf(PropTypes.object)
};

Contributors.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.contributors });

export default connect(select)(Contributors);
