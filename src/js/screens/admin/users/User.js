import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import CloseIcon from 'grommet/components/icons/base/Close';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import TextInput from 'grommet/components/TextInput';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../../../components/NavControl';

import { pageLoaded } from '../../utils';

class User extends Component {
  componentDidMount() {
    const { intl } = this.context;
    const { match: { params: { id } } } = this.props;
    if (id) {
      pageLoaded(id);
    } else {
      pageLoaded(getMessage(intl, 'RegisterUser'));
    }
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
          <NavControl name={getMessage(intl, 'RegisterUser')} />
        </Header>
        <Box margin='medium' pad='small' colorIndex='light-2'>
          <Form plain={true}>
            <Header>
              <Box margin='small'>
                <Heading tag='h3'>
                  {getMessage(intl, 'UserForm')}
                </Heading>
              </Box>
            </Header>
            <FormFields>
              <Box pad={{between: 'small'}}>
                <Box align='center' direction='row' pad={{between: 'small'}}>
                  <FormField label={getMessage(intl, 'Name')}>
                    <TextInput/>
                  </FormField>
                  <FormField label={getMessage(intl, 'Username')}>
                    <TextInput/>
                  </FormField>
                </Box>
                <Box align='center' direction='row' pad={{between: 'small'}}>
                  <FormField label={getMessage(intl, 'Email')}>
                    <TextInput/>
                  </FormField>
                  <FormField label={getMessage(intl, 'Active')}>
                    <CheckBox/>
                  </FormField>
                </Box>
              </Box>
            </FormFields>
            <Box direction='row' justify='end' margin={{vertical: 'small'}} pad={{between: 'small'}}>
              <Button type='submit'
                primary={true}
                icon={<CheckmarkIcon/>}
                label={getMessage(intl, 'Save')}/>
              <Button type='button'
                critical={true}
                href='#'
                icon={<CloseIcon/>}
                label={getMessage(intl, 'Delete')}/>
              <Button type='button'
                secondary={true}
                path='/users'
                icon={<LinkPreviousIcon/>}
                label={getMessage(intl, 'Back')}/>
            </Box>
          </Form>
        </Box>
      </Article>
    );
  }
}

User.contextTypes = {
  intl: PropTypes.object
};

User.defaultValues = {
  matcth: {
    params: {
      id: null
    }
  }
};

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  }).isRequired
};

export default User;
