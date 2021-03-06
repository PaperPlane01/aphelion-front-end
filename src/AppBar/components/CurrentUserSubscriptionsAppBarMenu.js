import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import Popover from "@material-ui/core/Popover";
import Hidden from "@material-ui/core/Hidden";
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import BlogList from "./BlogList";
import {withLocale} from "../../localization";

@withLocale
@inject('currentUserSubscriptionsStore')
@observer
class CurrentUserSubscriptionsAppBarMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElement: null
        }
    }

    openMenu = event => {
        const {currentUserSubscriptionsStore} = this.props;
        const {initiallyLoaded} = currentUserSubscriptionsStore;

        if (!initiallyLoaded) {
            currentUserSubscriptionsStore.fetchCurrentUserSubscriptions();
        }
        this.setState({anchorElement: event.target});
    };

    closeMenu = () => {
        this.setState({anchorElement: null});
    };

    render() {
        const {anchorElement} = this.state;
        const {currentUserSubscriptionsStore, l} = this.props;
        const {subscriptions, pending, initiallyLoaded} = currentUserSubscriptionsStore;

        return (
            <div>
                <Hidden mdUp>
                    <IconButton onClick={this.openMenu}
                                color="inherit"
                    >
                        <SubscriptionsIcon/>
                    </IconButton>
                </Hidden>
                <Hidden smDown>
                    <Button onClick={this.openMenu}
                            color="inherit"
                    >
                        <SubscriptionsIcon style={{marginRight: 5}}/>
                        {l('subscriptions')}
                    </Button>
                </Hidden>
                <Popover open={Boolean(anchorElement)}
                         onClose={this.closeMenu}
                         anchorEl={anchorElement}
                         anchorOrigin={{
                             vertical: 'bottom',
                             horizontal: 'center',
                         }}
                         transformOrigin={{
                             vertical: 'top',
                             horizontal: 'center',
                         }}
                         PaperProps={{
                             style: {
                                 maxHeight: 48 * 4.5,
                                 width: 200,
                             },
                         }}
                >
                    <BlogList pending={pending}
                              blogs={subscriptions.map(subscription => subscription.blog)}
                              emptyLabel={l('noSubscriptions')}
                              onItemClick={this.closeMenu}
                    />
                </Popover>
            </div>
        )
    }
}

CurrentUserSubscriptionsAppBarMenu.propTypes = {
    currentUserSubscriptionsStore: PropTypes.object,
    l: PropTypes.func
};

export default CurrentUserSubscriptionsAppBarMenu;