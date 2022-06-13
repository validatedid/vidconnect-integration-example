import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

export const CredentialButton = withStyles((theme) => ({
    root: {
    padding: '1%',
    display: 'block',
    borderStyle: 'none',
    width: 'auto',
    paddingLeft: '2%',
    paddingRight: '2%',
    height: '46px',
    background: '#9D56BE',
    borderRadius: '4px',
    color: '#ffffff',
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '5%',
    fontSize: '16px',
    lineHeight: '19px',
    fontStyle: 'normal',
    textAlign: 'center',
    textTransform: 'capitalize',
    },
  }))(Button);
  