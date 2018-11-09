import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {default as MaterialUiAppBar} from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'mobx-router';
import Drawer from './Drawer';
import views from '../../router-config';
import {UserMenuAppBar} from '../../User';
import {NotificationsHolder} from '../../Notification';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

@inject('store')
@inject('appBarStore')
@observer
class AppBar extends React.Component {
    render() {
        const {title, store, appBarStore, classes} = this.props;

        const linkToHome = (<Link store={store}
                                  view={views.home}
                                  style={{
                                      textDecoration: 'none',
                                      color: 'inherit'
                                  }}
        >
            Equinox
        </Link>);

        return <div style={{marginBottom: '80px'}}>
            <MaterialUiAppBar position="fixed" classes={classes} >
                <Toolbar>
                    <IconButton className={classes.menuButton}
                                color="inherit"
                                aria-label="Menu"
                                onClick={() => appBarStore.setDrawerOpened(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="headline" color="inherit" className={classes.grow}>
                        {title ? <span>
                        {linkToHome}
                            {` | ${title}`}
                    </span> : linkToHome}
                    </Typography>
                    <NotificationsHolder/>
                    <UserMenuAppBar/>
                </Toolbar>
            </MaterialUiAppBar>
            <Drawer/>
        </div>
    }
}

AppBar.propTypes = {
    title: PropTypes.string,
    classes: PropTypes.object,
    store: PropTypes.object,
    appBarStore: PropTypes.object,
    onMenuIconButtonClick: PropTypes.func
};

export default withStyles(styles)(AppBar);